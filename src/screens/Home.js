import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import React, { useContext } from 'react';
import pages from './pages.style';
import HomeHeader from '../components/HomeHeader';
import CategoryList from '../components/CategoryList';


const Home = () => {

  return (
    <SafeAreaView> 
      <View style={pages.viewOne}>
        <View style={pages.viewTwo}>
          <HomeHeader/>

          <ScrollView
            showsVerticalScrollIndicator={false} 
            style={{borderBottomEndRadius: 30, borderBottomStartRadius:30}}>

              <CategoryList />
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>  
  );
};

export default Home;