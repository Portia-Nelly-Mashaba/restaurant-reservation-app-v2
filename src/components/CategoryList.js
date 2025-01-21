import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { data } from './../constants/data'
import CategoryItem from './CategoryItem';


const CategoryList = ({setSelectedCategory, setSelectedSection, setSelectedValue}) => {
    const [selected, setSelected] = useState(null);
    const categories =[1, 2, 3, 5, 5] ;
  return (
    <FlatList
        data={data.categories}
        showsHorizontalScrollIndicator={false}
        horizontal
        style={{marginTop: 5}}
        keyExtractor={(item) => item._id}
        renderItem={({item}) => <TouchableOpacity>
            <CategoryItem  selected={selected} category={item}/>
        </TouchableOpacity>}
     />
  )
}

export default CategoryList