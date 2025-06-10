"use client"
import Stats from '../_components/prebuilts/stats';
// import {Header} from '../_components/prebuilts/header';
import CTA from '../_components/prebuilts/cta';
import Models from '../_components/prebuilts/models';
import  Header  from '../_components/prebuilts/header';
import { popUp } from '../store/order';
import { ConfirmationOrder } from '../_components/prebuilts/confirmaOrderPage';

export default function PrebuiltModelsPage() {

  const {isOpen } = popUp()

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 mt-20  sm:px-6 py-4 sm:py-8 max-w-7xl">

        {isOpen && <ConfirmationOrder/>}
    
        <Header/>
        {/* Stats */}
        <Stats/>

        {/* Tabs */}
        <Models/>
        {/* CTA Section */}
        <CTA/>
      </div>
    </div>
  );
};