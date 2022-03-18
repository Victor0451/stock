import React, { useEffect } from 'react'
import UserContext from "../../context/UserContext";
import Layout from '../../components/Layouts/Layout';
import HomeScreen from '../../components/home/HomeScreen';
import jsCookie from 'js-cookie';
import Router from 'next/router';

const Home = () => {

  let token = jsCookie.get("token")

  useEffect(() => {
    if (!token) {
      Router.push("/redirect");
    }

  }, []);

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