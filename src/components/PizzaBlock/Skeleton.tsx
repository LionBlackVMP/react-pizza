import ContentLoader from "react-content-loader";

export const Skeleton = () => (
  <ContentLoader
    speed={2}
    width={295}
    height={500}
    viewBox="0 0 295 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <circle cx="138" cy="135" r="125" />
    <rect x="5" y="272" rx="10" ry="10" width="283" height="25" />
    <rect x="5" y="318" rx="10" ry="10" width="283" height="88" />
    <rect x="5" y="425" rx="10" ry="10" width="95" height="30" />
    <rect x="133" y="425" rx="25" ry="25" width="155" height="45" />
  </ContentLoader>
);
