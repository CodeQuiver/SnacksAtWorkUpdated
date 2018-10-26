import React, { Component } from 'react';
import NumericInput from 'react-numeric-input';
import './SnackCard.css';



const PRODUCTS = [
  {
    name: 'Donuts',
    pluralName: 'donuts',
    image: 'images/donuts.jpg',
    priceText: '$6.99 each',
    price: (quantity) => {
      return quantity * 25;
    }
  },
  {
    name: 'Butter Cookies',
    pluralName: 'butter',
    image: 'images/butter.jpg',
    priceText: '$4.25 each',
    price: (quantity) => {
      return quantity * 15;
    }
  },
  {
    name: 'Bing Soo',
    pluralName: 'bing soo',
    image: 'images/bing.jpg',
    priceText: '$14.99 each',
    price: (quantity) => {
      return quantity * 30;
    }
  },
  {
    name: 'Bare',
    pluralName: 'Bare',
    image: 'images/bare.jpg',
    priceText: '$3.50 each',
    dealText: '3 for $1',
    price: (quantity) => {
        return quantity * 30;
  
    }
  },

  {
    name: 'Trailmix',
    pluralName: 'mix',
    image: 'images/mix.jpg',
    priceText: '$3.50 each',
    dealText: '3 for $1',
    price: (quantity) => {
      return quantity * 30;
    }
  },

  {
    name: 'Durian Pancake',
    pluralName: 'durian',
    image: 'images/durian.jpg',
    priceText: '$10.50 each',
    dealText: '2 for $19',
    price: (quantity) => {
      return quantity * 30;
    }
  },

];