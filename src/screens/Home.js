import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import React, { useContext, useState } from 'react';
import pages from './pages.style';
import HomeHeader from '../components/HomeHeader';
import CategoryList from '../components/CategoryList';
import ChoicesList from '../components/ChoicesList';
import Heading from '../components/Heading';
import NearByRestaurants from '../components/NearByRestaurants';
import Divider from '../components/Divider';


const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null); 
  const [selectedSection, setSelectedSection] = useState(null); 
  const [selectedValue, setSelectedValue] = useState(null); 
  const [selectedChoice, setSelectedChoice] = useState(null)
  console.log(selectedChoice);
  
  
  return (
    <SafeAreaView> 
      <View style={pages.viewOne}>
        <View style={pages.viewTwo}>
          <HomeHeader/>

          <ScrollView
            showsVerticalScrollIndicator={false} 
            style={{borderBottomEndRadius: 30, borderBottomStartRadius:30}}>

              <CategoryList 
                setSelectedCategory={setSelectedCategory}
                setSelectedSection={setSelectedSection}
                setSelectedValue={setSelectedValue}
              />
              <ChoicesList setSelectedChoice={setSelectedChoice} setSelectedSection={setSelectedSection}/>
              <View>
                <Heading heading={'Nearby Restaurants'} onPress={()=>{}} />

                <NearByRestaurants />

                <Divider />

                <Heading heading={'Recommended Restaurants'} onPress={()=>{}} />
              </View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>  
  );
};

export default Home;