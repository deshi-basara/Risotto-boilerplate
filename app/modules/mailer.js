var nodemailer = require('nodemailer');
var _ = require('underscore');
var path = require('path');
var emailTemplates = require('email-templates');

/**
 * Exposes the Mailer Api
 */
var mailer = Risotto.mailer = {};

/**
 * Init
 * @param {app} app
 * @param {Function} done
 */
exports.initialize = function( app ){
    return function(fn) {
        var transport, options;

        if(app.config.mailer.sendgrid.enabled === true){
            transport = require('nodemailer-sendgrid-transport');
            config = {
                auth: app.config.mailer.sendgrid.auth
            };
        } else {
            transport = require('nodemailer-smtp-transport');
            config = app.config.mailer.transport;
        }

        var templatePath = path.join(__dirname, app.config.mailer.templates);

        emailTemplates(templatePath, function(err, templates) {
            app.mailer.templates = templates;
            fn(err);
        }.bind(this));

        // configure transport
        if(app.config.mailer.smtp) {
            // use smtp transpot
            app.mailer.transporter = nodemailer.createTransport(transport(config));
        }
        else {
            // use default mx transport over port 25
            app.mailer.transporter = nodemailer.createTransport();
        }
    };
};

/**
 * Renders `template` with `templateLocals` and send with `emailOptions`
 * @param {String}                      template
 * @param {Object}                      templateLocals
 * @param {nodemailer.emailOptions}     emailOptions
 * @param {Object}                      handOptions [Passthrough kue-job data, passed because of co*s local scope]
 * @param {function}                    cb [Callback, returns err]
 */
mailer.sendMailFromTemplate = function( template, templateLocals, emailOptions, handOptions, cb ){

    // render template
    this.templates(template, templateLocals, function(err, html, text){
        if(err) {
            Risotto.logger.error('modules/mailers.js: Error while sending an email from template to <'+ emailOptions.to +'> : '+ err);
            return cb(err);
        }

        var options = _.extend({
            html : html,
            text : text
        }, emailOptions, Risotto.config.mailer.mailOptions);

        this.transporter.sendMail(options, function(err) {
            if(err) {
                Risotto.logger.error('modules/mailers.js: Error while sending an email from template to <'+ emailOptions.to +'> : '+ err);
            }

            return cb(err, handOptions);
        });
    }.bind(this));
};