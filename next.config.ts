import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  agentRules: false,
  async redirects() {
    return [
      { source: '/case-studies.html', destination: '/case-studies', permanent: true },
      { source: '/case-study-prevsi.html', destination: '/case-studies/prevsi', permanent: true },
      { source: '/case-study-foundrylane.html', destination: '/case-studies/foundrylane', permanent: true },
      { source: '/case-study-wemoverd.html', destination: '/case-studies/wemoverd', permanent: true },
      { source: '/case-study-rookiebets.html', destination: '/case-studies/rookiebets', permanent: true },
      {
        source: '/case-study-rmj-transportation.html',
        destination: '/case-studies/rmj-transportation',
        permanent: true,
      },
      { source: '/case-study-ledgerport.html', destination: '/case-studies/ledgerport', permanent: true },
      { source: '/case-study-gatherstay.html', destination: '/case-studies/gatherstay', permanent: true },
    ];
  },
};

export default nextConfig;
