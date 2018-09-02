import Application from '../app';
import config from '../config/environment';
import { setApplication } from '@ember/test-helpers';
import { start } from 'ember-qunit';
import logLeakedTimers from './helpers/logLeakedTimers';

logLeakedTimers();

setApplication(Application.create(config.APP));

start();
