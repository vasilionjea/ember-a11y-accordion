import Application from 'dummy/app';
import config from 'dummy/config/environment';
import * as QUnit from 'qunit';
import logLeakedTimers from './helpers/logLeakedTimers';
import { setApplication } from '@ember/test-helpers';
import { setup } from 'qunit-dom';
import { start } from 'ember-qunit';

logLeakedTimers();

setApplication(Application.create(config.APP));

setup(QUnit.assert);

start();
