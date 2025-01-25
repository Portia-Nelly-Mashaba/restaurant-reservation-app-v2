import React, { useState } from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import CategoryItem from './CategoryItem';
import { data } from '../constants/data';

const CategoryList = ({ setSelectedCategory, setSelectedSection, setSelectedValue }) => {
    const [selected, setSelected] = useState(null);

    const handleSelectedCategory = (item) => {
        if(selected === item._id){
            setSelected(null);
            setSelectedCategory(null);
            setSelectedSection(null);
            setSelectedValue(null);
        } else {
            setSelected(item._id);
            setSelectedCategory(item._id);
            setSelectedSection('category');
            setSelectedValue(item.name);
        }
    }

    console.log("Categories Data:", data.categories);

    return (
        <FlatList
            data={data.categories}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item._id.toString()}
            renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleSelectedCategory(item)}>
                    <CategoryItem selected={selected} category={item} />
                </TouchableOpacity>
            )}
        />
    );
};

export default CategoryList;
