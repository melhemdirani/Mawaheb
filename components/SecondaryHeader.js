import { View, Text, StyleSheet, ImageBackground, Image, Pressable} from 'react-native'
import React from 'react'
import secondaryHeader from '../assets/images/test2.png'
import searchIcon from '../assets/images/search.png'
import heartIcon from '../assets/images/heart.png'
import filterIcon from '../assets/images/filterIcon.png'
import Inputs from './Inputs'
import SearchInput from './SearchInput'

const SecondaryHeader = ({ title, heart, search, filter, onFilter,handleChange, setShowSearch, showSearch, fav, setFavRoute, favRoute }) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={secondaryHeader}
        style={styles.image}
        resizeMode='cover'
      >
        <View style={styles.subContainer}>
          {
            showSearch && search ?
            <View style={styles.searchContainer}>
              <SearchInput 
                onChange={(e) => handleChange("search", e)}
                placeholder="Search"
              />
              <Pressable onPress={() => setShowSearch(false)}       style={styles.searchIcon}>
                <Image
                  source={ searchIcon}
                  />
              </Pressable>
            </View>
            : search 
            ? <View style={styles.searchContainer2}>
                <Text style={styles.text}>{title}</Text>
                <Pressable onPress={() => setShowSearch(true)}>
                  <Image
                    source={ searchIcon}
                  />
                </Pressable>
              </View>
            : <View style={styles.searchContainer2}>
                <Text style={styles.text}>{title}</Text>
              </View>
          }
   
          { 
            filter?
            <Pressable onPress={() => onFilter()}  style={styles.filterIcon}>
              <Image
                source={filterIcon}
                resizeMode='cover'
              />
            </Pressable>
            : fav ?
            <Pressable onPress={() => setFavRoute(!favRoute)}>
                <Image
                  source={ heartIcon}
                  style={styles.filterIcon}
                  resizeMode='cover'
                />
            </Pressable>
            : null
              
          
          }
       
        </View>
      </ImageBackground>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    zIndex: -99
  },
  searchContainer:{
    width: "80%",
    flexDirection: "row",
    justifyContent: "space-between",
    height: 30,

  },
  searchContainer2:{
    width: "80%",
    flexDirection: "row",
    justifyContent: "space-between",
    height: 30,
    alignItems: "center"
  },
  miniContainer:{
    flexDirection: "row",
    width: 100,
    justifyContent: "space-between"
  },  
  miniContainer2:{
    flexDirection: "row",
    width: 20,
    justifyContent: "space-between"
  },  
  image: {
    width: '100%',
    height: 130,
    zIndex: -1,
  },
  arc: {},
  text: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    zIndex: 1,
  },
  searchIcon: {
    alignSelf: "center"
  },

  filterIcon: {
    right: 10,
  },
  subContainer:{
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    top: 60,
    paddingLeft: 10,
    paddingRight: 10,
  },
})

export default SecondaryHeader
