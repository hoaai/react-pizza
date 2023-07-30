import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton: React.FC = () => (
   <ContentLoader
      className="pizza-block"
      speed={2}
      width={280}
      height={500}
      viewBox="0 0 280 500"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb">
      <circle cx="134" cy="136" r="125" />
      <rect x="0" y="286" rx="10" ry="10" width="280" height="20" />
      <rect x="0" y="327" rx="11" ry="11" width="280" height="88" />
      <rect x="2" y="430" rx="9" ry="9" width="95" height="30" />
      <rect x="129" y="425" rx="24" ry="24" width="152" height="45" />
   </ContentLoader>
);

export default Skeleton;
