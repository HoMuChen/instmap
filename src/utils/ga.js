import ReactGA from 'react-ga';

export const sendPageview = (page) => {
  ReactGA.pageview(page);
}

export const sendEvent = (payload) => {
  ReactGA.event(payload);
}
