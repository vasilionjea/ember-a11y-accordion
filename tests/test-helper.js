import Application from '../app';
import config from '../config/environment';
import logLeakedTimers from './helpers/logLeakedTimers';
import { setApplication } from '@ember/test-helpers';
import { start } from 'ember-qunit';

logLeakedTimers();

setApplication(Application.create(config.APP));

start();
