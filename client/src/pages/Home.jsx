import React from 'react'
import Hero from '../components/Hero'
import FeaturedDestination from '../components/FeaturedDestination'
import ExclusiveOffers from '../components/ExclusiveOffers'
import Testimonial from '../components/Testimonial'
import NewsLetter from '../components/NewsLetter'
import RecommendedHotel from '../components/RecommendedHotels'

export default function Home() {
  return (
    <>
      <Hero />
      <RecommendedHotel/>
      <FeaturedDestination />
      <ExclusiveOffers />
      <Testimonial /> 
      <NewsLetter />
    </>
  )
}
