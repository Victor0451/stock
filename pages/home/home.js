import React from 'react'
import UserContext from "../../context/UserContext";
import Layout from '../../components/Layouts/Layout';
import HomeScreen from '../../components/home/HomeScreen';

const Home = () => {

  return (
    <UserContext.Consumer>
      {({ usuario, token }) => {

        return (
          <Layout>
            <HomeScreen />
          </Layout>
        );
      }}
    </UserContext.Consumer>
  )
}

export default Home