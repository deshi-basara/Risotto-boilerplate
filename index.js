#!/usr/bin/env node
process.title = "[XXX-Ticketing2]Web";

/*
 * webserver
 */

var Risotto = new require('./Risotto');

Risotto.initialize(__dirname);