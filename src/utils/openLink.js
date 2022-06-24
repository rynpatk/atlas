/**
 * opening a new tab as a background tab is not currently possible.
 * note that this behavior would be ideal if at all possible.
 */
export default function openLink(link = {}) {
  if (link.url.indexOf('http://') === 0 || link.url.indexOf('https://') === 0) {
    window.open(link.url, '_blank');
  } else {
    window.open(`http://${link.url}`, '_blank');
  }
}
