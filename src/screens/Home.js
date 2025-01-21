import { View, Text, SafeAreaView } from 'react-native';
import React, { useContext } from 'react';
import pages from './pages.style';
import HomeHeader from '../components/HomeHeader';


const Home = () => {

  return (
    <SafeAreaView> 
      <View style={pages.viewOne}>
        <View style={pages.viewTwo}>
          <HomeHeader/>
        </View>
      </View>
    </SafeAreaView>  
  );
};

export default Home;