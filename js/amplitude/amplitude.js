import amplitude from 'amplitude-js';

export const texts = {
  eventPrefix: 'eSyfo DMSM:',
};

const combineEventData = (eventData) => {
  return {
    team: 'eSyfo',
    app: 'dialogmote',
    ...eventData,
  };
};

export const initAmplitude = () => {
  if (amplitude) {
    amplitude.getInstance().init('default', '', {
      apiEndpoint: 'amplitude.nav.no/collect-auto',
      saveEvents: false,
      includeUtm: true,
      includeReferrer: true,
      platform: window.location.toString(),
    });
  }
};

export const trackEvent = (eventName, eventData) => {
  if (amplitude) {
    amplitude.getInstance().logEvent(eventName, combineEventData(eventData));
  }
};

export const trackOnClick = (elementName, eventData) => {
  if (amplitude) {
    const trackingName = `${texts.eventPrefix} ${elementName}`;
    amplitude.getInstance().logEvent(trackingName, combineEventData(eventData));
  }
};
