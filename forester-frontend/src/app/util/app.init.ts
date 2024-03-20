import { KeycloakService } from 'keycloak-angular';
export function initializeKeycloak(keycloak: KeycloakService): () => Promise<boolean> {
    const realm = localStorage.getItem("realm");

    return () =>
      keycloak.init({
        config: {
          url: "https://keycloak.forester.dvloper.io",
          realm: "master",
          clientId: "forester-frontend"
        },
        initOptions: {
          checkLoginIframe: true,
          onLoad: "check-sso",
          checkLoginIframeInterval: 25,
        },
        loadUserProfileAtStartUp: true,
        enableBearerInterceptor: true,
        authorizationHeaderName: "access-token",
      });
  }
