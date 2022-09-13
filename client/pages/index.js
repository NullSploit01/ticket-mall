import axiosApi from "../api/build-client";

const Landing = ({ currentUser }) => {
  return <h1>Landing Page {currentUser.email}</h1>;
};

Landing.getInitialProps = async (context) => {
  const { data } = await axiosApi(context).get("/api/users/currentuser");
  return data;
};

export default Landing;
