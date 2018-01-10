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

// Needs to be empty for e2e test
const authOptions: KeycloakInitOptions = {};
const authConfig: KeycloakConfig = {
    realm: 'YOUR_REALM',
    url: 'https://YOUR_SERVER.com/auth',
    clientId: 'YOUR_CLIENT_ID'
};

export const environment: Environment = {
    production: false,
    authConfig,
    authOptions
};
