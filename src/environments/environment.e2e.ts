/**
 * Copyright (C) Schweizerische Bundesbahnen SBB, 2017.
 *
 * ESTA WebJS 2: Environment for e2e tests
 *
 * @author u218609 (Kevin Kreuzer)
 * @version: 5.1.0
 * @since 05.01.2018, 2018.
 */
import {KeycloakInitOptions} from 'keycloak-js';
import {KeycloakConfig} from 'esta-webjs-extensions';
import {Environment} from './environment.model';

const authOptions: KeycloakInitOptions = {flow: 'implicit'};
const authConfig: KeycloakConfig = {
  'realm': 'SBB_Public',
  'url': 'https://sso-dev.sbb.ch/auth',
  'clientId': 'client-esta-webjs-frontend-dev'
};

export const environment: Environment = {
  production: false,
  authConfig,
  authOptions
};
