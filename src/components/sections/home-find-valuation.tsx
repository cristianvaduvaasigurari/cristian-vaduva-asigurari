"use client";

import * as React from "react"; import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, ShieldCheck, Landmark, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// District pricing metrics for Romania
const LOCATION_BASE_PRICES: Record<string, { base: number; neighborhoods: Record<string, number> }> = {
  Bucuresti: {
    base: 1800,
    neighborhoods: {
      "Primaverii / Herastrau": 4500,
      "Floreasca / Dorobanti": 3500,
      "Aviatorilor / Kiseleff": 4000,
      "Centru (Universitate/Unirii)": 2200,
      "Nord (Baneasa/Pipera)": 2600,
      "Periferie / Zone rezidentiale noi": 1400,
      "Altele": 1600
    }
  },
  Cluj: {
    base: 2400,
    neighborhoods: {
      "Centru / Dorobanti": 3100,
      "Gheorgheni / Zorilor": 2600,
      "Manastur / Marasti": 2200,
      "Buna Ziua / Europa": 2500,
      "Floresti (Suburbie)": 1300,
      "Altele": 2000
    }
  },
  Timisoara: {
    base: 1500,
    neighborhoods: {
      "Centru / Cetate": 2000,
      "Calea Aradului / Lipovei": 1600,
      "Complex Studentesc": 1700,
      "Girocului / Braytim": 1550,
      "Periferie": 1200,
      "Altele": 1400
    }
  },
  Brasov: {
    base: 1600,
    neighborhoods: {
      "Centru Istoric": 2500,
      "Tractorul": 1650,
      "Astra": 1500,
      "Poiana Brasov": 3500,
      "Altele": 1450
    }
  },
  Constanta: {
    base: 1550,
    neighborhoods: {
      "Faleza Nord / Mamaia": 2600,
      "Centru / Peninsula": 1800,
      "Tomis Nord": 1500,
      "Periferie": 1100,
      "Altele": 1350
    }
  }
};

const deterministicVariance = (values: Array<string | number | boolean>) => {
  const signature = values.join("|");
  let hash = 0;

  for (let index = 0; index < signature.length; index++) {
    hash = (hash * 31 + signature.charCodeAt(index)) % 100000;
  }

  return 0.98 + (hash / 100000) * 0.04;
};

export function HomeFindValuation() {
  const [inputs, setInputs] = useState({
    location: "Bucuresti",
    neighborhood: "Primaverii / Herastrau",
    street: "Bulevardul Aviatorilor",
    propertyType: "Apartament", // Apartament, Casa/Vila, Penthouse, Spatiu Comercial
    usableArea: 80,
    builtArea: 96,
    landArea: 0, // only for house
    floor: 3,
    totalFloors: 5,
    buildingAge: 5, // years
    renovationStatus: "Ultra-luxury", // Ultra-luxury, Modern/Renovat, Standard, Necesita renovare
    rooms: 3,
    bathrooms: 2,
    balconies: 1,
    parking: "Underground", // Underground, Surface, None
    storage: true,
    energyClass: "A", // A, B, C
    orientation: "South-East", // South-East, North-West, South, North, etc.
    transportProximity: "Sub 5 minute", // Sub 5 minute, 5-15 minute, Peste 15 minute
    schoolsProximity: "Excelenta", // Excelenta, Medie, Slaba
    parksProximity: "Excelenta", // Excelenta, Medie, Slaba
    shoppingProximity: "Excelenta", // Excelenta, Medie, Slaba
    officesProximity: "Excelenta", // Excelenta, Medie, Slaba
    luxuryLevel: "Exclusive/Luxury", // Exclusive/Luxury, Premium, Standard
    marketTrends: "In Crestere" // In Crestere (+5%), Stabile, In Scadere (-5%)
  });

  const [result, setResult] = useState<{
    estimatedValue: number;
    pricePerSqm: number;
    confidenceScore: number;
    valuationBreakdown: {
      baseValue: number;
      renovationAdjustment: number;
      luxuryAdjustment: number;
      locationAdjustment: number;
      ageAdjustment: number;
      amenitiesAdjustment: number;
      marketTrendAdjustment: number;
    };
  } | null>(null);

  const [isCalculating, setIsCalculating] = useState(false);

  // Handle location change and update neighborhoods list
  const handleLocationChange = (loc: string) => {
    const defaultNeighborhood = Object.keys(LOCATION_BASE_PRICES[loc]?.neighborhoods || {})[0] || "Altele";
    setInputs(prev => ({
      ...prev,
      location: loc,
      neighborhood: defaultNeighborhood
    }));
  };

  const calculateValuation = () => {
    setIsCalculating(true);
    setResult(null);

    setTimeout(() => {
      // 1. Base Price per sqm from Location & Neighborhood with micro-location variance
      const locationData = LOCATION_BASE_PRICES[inputs.location] || LOCATION_BASE_PRICES["Bucuresti"];
      let baseSqmPrice = locationData.neighborhoods[inputs.neighborhood] || locationData.base;

      // Add micro-location variance based on street characteristics
      const streetLower = inputs.street.toLowerCase();
      let microLocationVariance = 0;
      if (streetLower.includes("bulevard") || streetLower.includes("calea")) {
        microLocationVariance = 0.12; // main avenues premium
      } else if (streetLower.includes("strada") || streetLower.includes("șoseaua")) {
        microLocationVariance = 0.05; // regular streets
      } else if (streetLower.includes("intrarea") || streetLower.includes("alee")) {
        microLocationVariance = 0.02; // quiet alleys
      } else if (streetLower.includes("piața") || streetLower.includes("piata")) {
        microLocationVariance = 0.15; // square proximity premium
      }
      baseSqmPrice *= (1 + microLocationVariance);

      // 2. Base Property Value with sophisticated area calculations
      const usableArea = Math.max(inputs.usableArea, 1);
      const builtArea = Math.max(inputs.builtArea, usableArea);
      let areaFactor = usableArea;
      
      // Built area efficiency ratio
      const efficiencyRatio = usableArea / builtArea;
      if (efficiencyRatio > 0.85) {
        areaFactor *= 1.05; // high efficiency premium
      } else if (efficiencyRatio < 0.65) {
        areaFactor *= 0.95; // low efficiency discount
      }

      if (builtArea > usableArea) {
        areaFactor += (builtArea - usableArea) * 0.20;
      }
      
      let baseValue = baseSqmPrice * areaFactor;
      
      // Land area calculation with zoning factors
      if (inputs.propertyType === "Casa/Vila" && inputs.landArea > 0) {
        const landDensityFactor = Math.min(inputs.landArea / 500, 2); // cap at 2x
        const landValue = inputs.landArea * (baseSqmPrice * 0.40 * landDensityFactor);
        baseValue += landValue;
      }

      // 3. Building Structure & Quality Assessment
      let structureMultiplier = 1.0;
      if (inputs.buildingAge <= 1) structureMultiplier = 1.15; // brand new
      else if (inputs.buildingAge <= 3) structureMultiplier = 1.10;
      else if (inputs.buildingAge <= 5) structureMultiplier = 1.05;
      else if (inputs.buildingAge <= 10) structureMultiplier = 1.00;
      else if (inputs.buildingAge <= 15) structureMultiplier = 0.95;
      else if (inputs.buildingAge <= 25) structureMultiplier = 0.85;
      else if (inputs.buildingAge <= 40) structureMultiplier = 0.75;
      else structureMultiplier = 0.65; // historic buildings

      // Building type adjustments
      if (inputs.propertyType === "Casa/Vila") {
        structureMultiplier *= 1.08; // houses premium
      } else if (inputs.propertyType === "Penthouse") {
        structureMultiplier *= 1.25; // penthouse premium
      } else if (inputs.propertyType === "Spatiu Comercial") {
        structureMultiplier *= 0.90; // commercial discount
      }

      const structureAdjustment = baseValue * (structureMultiplier - 1);
      let runningValue = baseValue + structureAdjustment;

      // 4. Renovation & Interior Quality Matrix
      const renovationMatrix = {
        "Ultra-luxury": { multiplier: 1.45, qualityBonus: 35000 },
        "Modern/Renovat": { multiplier: 1.20, qualityBonus: 18000 },
        "Standard": { multiplier: 1.00, qualityBonus: 0 },
        "Necesita renovare": { multiplier: 0.78, qualityBonus: -25000 }
      };
      
      const renovationData = renovationMatrix[inputs.renovationStatus as keyof typeof renovationMatrix] || renovationMatrix["Standard"];
      const renovationAdjustment = (runningValue * (renovationData.multiplier - 1)) + renovationData.qualityBonus;
      runningValue += renovationAdjustment;

      // 5. Luxury Materials & Finishes Assessment
      const luxuryMatrix = {
        "Exclusive/Luxury": { multiplier: 1.50, materialPremium: 45000 },
        "Premium": { multiplier: 1.22, materialPremium: 22000 },
        "Standard": { multiplier: 0.92, materialPremium: -5000 }
      };
      
      const luxuryData = luxuryMatrix[inputs.luxuryLevel as keyof typeof luxuryMatrix] || luxuryMatrix["Standard"];
      const luxuryAdjustment = (runningValue * (luxuryData.multiplier - 1)) + luxuryData.materialPremium;
      runningValue += luxuryAdjustment;

      // 6. Floor Positioning & View Analysis
      let floorBonus = 0;
      if (inputs.propertyType === "Apartament" || inputs.propertyType === "Penthouse") {
        const floorRatio = inputs.floor / inputs.totalFloors;
        
        if (inputs.propertyType === "Penthouse" && inputs.floor === inputs.totalFloors) {
          floorBonus += 55000; // penthouse premium
        } else if (inputs.floor === 0) {
          floorBonus -= 18000; // ground floor discount
        } else if (inputs.floor === 1) {
          floorBonus -= 8000; // first floor discount
        } else if (floorRatio > 0.6 && floorRatio < 0.9) {
          floorBonus += 12000; // upper middle floors premium
        } else if (floorRatio >= 0.9 && inputs.propertyType !== "Penthouse") {
          floorBonus -= 6000; // top floor without penthouse
        } else {
          floorBonus += 3000; // middle floors
        }

        // View premium based on floor
        if (inputs.floor >= 4) {
          floorBonus += 8000 * (inputs.floor / 10); // view premium scaling
        }
      }
      runningValue += floorBonus;

      // 7. Room Configuration Efficiency
      const optimalRoomDensity = usableArea / 25; // optimal 25mp per room
      const roomEfficiency = inputs.rooms / Math.max(optimalRoomDensity, 1);
      let roomConfigurationBonus = 0;
      
      if (roomEfficiency > 1.2) {
        roomConfigurationBonus -= 10000; // too many rooms, cramped
      } else if (roomEfficiency < 0.7) {
        roomConfigurationBonus -= 8000; // too few rooms, inefficient
      } else {
        roomConfigurationBonus += 5000; // optimal configuration
      }

      // Bathroom premium
      const bathroomRatio = inputs.bathrooms / inputs.rooms;
      if (bathroomRatio >= 1) {
        roomConfigurationBonus += 15000; // en-suite premium
      } else if (bathroomRatio >= 0.5) {
        roomConfigurationBonus += 8000;
      } else {
        roomConfigurationBonus -= 5000;
      }

      // Balcony space value
      roomConfigurationBonus += inputs.balconies * 6000;
      runningValue += roomConfigurationBonus;

      // 8. Parking & Storage Valuation
      let parkingValue = 0;
      if (inputs.parking === "Underground") {
        parkingValue = 32000; // underground premium
      } else if (inputs.parking === "Surface") {
        parkingValue = 15000; // surface parking
      }
      
      // Storage space value
      if (inputs.storage) {
        parkingValue += 8000;
      }
      runningValue += parkingValue;

      // 9. Energy Efficiency & Sustainability
      let energyBonus = 0;
      if (inputs.energyClass === "A") {
        energyBonus = 18000; // A class premium
      } else if (inputs.energyClass === "B") {
        energyBonus = 8000;
      } else if (inputs.energyClass === "C") {
        energyBonus = -5000; // C class discount
      } else {
        energyBonus = -12000; // lower classes
      }
      runningValue += energyBonus;

      // 10. Orientation & Natural Light Analysis
      let orientationBonus = 0;
      if (inputs.orientation.includes("South")) {
        orientationBonus = 9000; // south-facing premium
      } else if (inputs.orientation.includes("East")) {
        orientationBonus = 5000; // east-facing morning light
      } else if (inputs.orientation.includes("West")) {
        orientationBonus = 3000; // west-facing evening light
      } else {
        orientationBonus = -2000; // north-facing discount
      }
      runningValue += orientationBonus;

      // 11. Proximity Infrastructure Scoring
      let infrastructureScore = 0;
      
      // Transport proximity
      if (inputs.transportProximity === "Sub 5 minute") {
        infrastructureScore += 15000;
      } else if (inputs.transportProximity === "5-15 minute") {
        infrastructureScore += 7000;
      } else {
        infrastructureScore -= 6000;
      }

      // Education proximity
      if (inputs.schoolsProximity === "Excelenta") {
        infrastructureScore += 12000;
      } else if (inputs.schoolsProximity === "Medie") {
        infrastructureScore += 4000;
      } else {
        infrastructureScore -= 3000;
      }

      // Recreation proximity
      if (inputs.parksProximity === "Excelenta") {
        infrastructureScore += 11000;
      } else if (inputs.parksProximity === "Medie") {
        infrastructureScore += 5000;
      }

      // Commercial proximity
      if (inputs.shoppingProximity === "Excelenta") {
        infrastructureScore += 8000;
      } else if (inputs.shoppingProximity === "Medie") {
        infrastructureScore += 3000;
      }

      // Business district proximity
      if (inputs.officesProximity === "Excelenta") {
        infrastructureScore += 7000;
      } else if (inputs.officesProximity === "Medie") {
        infrastructureScore += 2000;
      }

      runningValue += infrastructureScore;

      // 12. Market Dynamics & Seasonality
      let marketDynamics = 1.0;
      if (inputs.marketTrends === "In Crestere") {
        marketDynamics = 1.08; // growth premium
      } else if (inputs.marketTrends === "Stabila") {
        marketDynamics = 1.0;
      } else {
        marketDynamics = 0.92; // decline discount
      }

      // Location-specific market adjustments
      if (inputs.location === "Bucuresti" && inputs.neighborhood.includes("Primaverii")) {
        marketDynamics *= 1.12; // premium area premium
      } else if (inputs.location === "Cluj" && inputs.neighborhood.includes("Centru")) {
        marketDynamics *= 1.08;
      }

      const marketAdjustment = runningValue * (marketDynamics - 1);
      runningValue += marketAdjustment;

      // 13. Property Type-Specific Adjustments
      let typeSpecificAdjustment = 0;
      if (inputs.propertyType === "Casa/Vila") {
        // Garden value for houses
        if (inputs.landArea > 200) {
          typeSpecificAdjustment += 15000;
        }
        // Privacy premium
        typeSpecificAdjustment += 10000;
      } else if (inputs.propertyType === "Penthouse") {
        // Terrace value
        typeSpecificAdjustment += 25000;
        // Privacy & exclusivity
        typeSpecificAdjustment += 20000;
      } else if (inputs.propertyType === "Apartament") {
        // Building density discount
        if (inputs.totalFloors > 10) {
          typeSpecificAdjustment -= 3000;
        }
      }
      runningValue += typeSpecificAdjustment;

      // 14. Final Value Calculation with deterministic micro-market variance.
      const varianceFactor = deterministicVariance([
        inputs.location,
        inputs.neighborhood,
        inputs.street.trim().toLowerCase(),
        inputs.propertyType,
        usableArea,
        builtArea,
        inputs.landArea,
        inputs.floor,
        inputs.totalFloors,
        inputs.buildingAge,
        inputs.renovationStatus,
        inputs.rooms,
        inputs.bathrooms,
        inputs.balconies,
        inputs.parking,
        inputs.storage,
        inputs.energyClass,
        inputs.orientation,
        inputs.transportProximity,
        inputs.schoolsProximity,
        inputs.parksProximity,
        inputs.shoppingProximity,
        inputs.officesProximity,
        inputs.luxuryLevel,
        inputs.marketTrends
      ]);
      const finalEstimatedValue = Math.max(10000, Math.round(runningValue * varianceFactor));
      const pricePerSqm = Math.round(finalEstimatedValue / usableArea);

      // Enhanced confidence scoring
      let confidence = 92;
      if (inputs.buildingAge > 30) confidence -= 8;
      if (inputs.landArea === 0 && inputs.propertyType === "Casa/Vila") confidence -= 12;
      if (inputs.street === "") confidence -= 6;
      if (inputs.renovationStatus === "Necesita renovare") confidence -= 5;
      if (inputs.location === "Bucuresti" && inputs.neighborhood === "Altele") confidence -= 4;
      
      // Boost confidence for premium properties
      if (inputs.luxuryLevel === "Exclusive/Luxury" && inputs.renovationStatus === "Ultra-luxury") {
        confidence += 3;
      }

      setResult({
        estimatedValue: finalEstimatedValue,
        pricePerSqm,
        confidenceScore: Math.min(confidence, 98),
        valuationBreakdown: {
          baseValue: Math.round(baseValue),
          renovationAdjustment: Math.round(renovationAdjustment),
          luxuryAdjustment: Math.round(luxuryAdjustment),
          locationAdjustment: Math.round(structureAdjustment + microLocationVariance * baseValue),
          ageAdjustment: Math.round(structureAdjustment),
          amenitiesAdjustment: Math.round(floorBonus + roomConfigurationBonus + parkingValue + energyBonus + orientationBonus + infrastructureScore),
          marketTrendAdjustment: Math.round(marketAdjustment + typeSpecificAdjustment)
        }
      });
      setIsCalculating(false);
    }, 1500);
  };

  return (
    <section className="py-24 bg-[#FAF9F6] border-t border-slate-100">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100/60 text-amber-900 text-xs font-semibold mb-6 uppercase tracking-wider border border-amber-200/50">
            <Calculator className="w-3.5 h-3.5" /> Evaluator Imobiliar Avansat
          </div>
          <h2 className="text-4xl md:text-5xl font-bold font-heading text-slate-900 mb-6 tracking-tight">
            Valuation Engine Home Find™
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Rulați o evaluare detaliată a proprietății utilizând motorul nostru algoritmic ce analizează peste 25 de parametri micro și macro-economici.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-8">
          {/* Inputs Panel */}
          <div className="lg:col-span-7 bg-white p-8 md:p-10 rounded-[2.5rem] border border-slate-200/60 shadow-xl space-y-6">
            <h3 className="text-xl font-bold font-heading text-slate-800 flex items-center gap-2.5 pb-4 border-b border-slate-100">
              <Building className="w-5 h-5 text-amber-600" /> Parametri Proprietate
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Location & Neighborhood */}
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2 block">Oraș</label>
                <select
                  value={inputs.location}
                  onChange={e => handleLocationChange(e.target.value)}
                  className="w-full h-12 rounded-xl bg-slate-50 border border-slate-200 px-4 text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/20 font-medium"
                >
                  <option value="Bucuresti">București</option>
                  <option value="Cluj">Cluj-Napoca</option>
                  <option value="Timisoara">Timișoara</option>
                  <option value="Brasov">Brașov</option>
                  <option value="Constanta">Constanța</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2 block">Cartier / Zonă</label>
                <select
                  value={inputs.neighborhood}
                  onChange={e => setInputs(prev => ({ ...prev, neighborhood: e.target.value }))}
                  className="w-full h-12 rounded-xl bg-slate-50 border border-slate-200 px-4 text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/20 font-medium"
                >
                  {Object.keys(LOCATION_BASE_PRICES[inputs.location]?.neighborhoods || {}).map(nb => (
                    <option key={nb} value={nb}>{nb}</option>
                  ))}
                </select>
              </div>

              {/* Street & Property Type */}
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2 block">Strada / Adresă orientativă</label>
                <Input
                  type="text"
                  value={inputs.street}
                  onChange={e => setInputs(prev => ({ ...prev, street: e.target.value }))}
                  placeholder="ex: Bulevardul Aviatorilor"
                  className="h-12 bg-slate-50 border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2 block">Tip Proprietate</label>
                <select
                  value={inputs.propertyType}
                  onChange={e => setInputs(prev => ({ ...prev, propertyType: e.target.value }))}
                  className="w-full h-12 rounded-xl bg-slate-50 border border-slate-200 px-4 text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/20 font-medium"
                >
                  <option value="Apartament">Apartament</option>
                  <option value="Casa/Vila">Casă / Vilă</option>
                  <option value="Penthouse">Penthouse</option>
                  <option value="Spatiu Comercial">Spațiu Comercial</option>
                </select>
              </div>

              {/* Areas */}
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2 block">Suprafață Utilă (mp)</label>
                <Input
                  type="number"
                  value={inputs.usableArea}
                  onChange={e => setInputs(prev => ({ ...prev, usableArea: Number(e.target.value) || 0 }))}
                  className="h-12 bg-slate-50 border-slate-200 rounded-xl font-bold"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2 block">Suprafață Construită (mp)</label>
                <Input
                  type="number"
                  value={inputs.builtArea}
                  onChange={e => setInputs(prev => ({ ...prev, builtArea: Number(e.target.value) || 0 }))}
                  className="h-12 bg-slate-50 border-slate-200 rounded-xl"
                />
              </div>

              {inputs.propertyType === "Casa/Vila" && (
                <div className="col-span-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2 block">Suprafață Teren (mp)</label>
                  <Input
                    type="number"
                    value={inputs.landArea}
                    onChange={e => setInputs(prev => ({ ...prev, landArea: Number(e.target.value) || 0 }))}
                    className="h-12 bg-slate-50 border-slate-200 rounded-xl"
                  />
                </div>
              )}

              {/* Floor / Total floors */}
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2 block">Etaj</label>
                <Input
                  type="number"
                  value={inputs.floor}
                  onChange={e => setInputs(prev => ({ ...prev, floor: Number(e.target.value) || 0 }))}
                  className="h-12 bg-slate-50 border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2 block">Total Etaje Clădire</label>
                <Input
                  type="number"
                  value={inputs.totalFloors}
                  onChange={e => setInputs(prev => ({ ...prev, totalFloors: Number(e.target.value) || 0 }))}
                  className="h-12 bg-slate-50 border-slate-200 rounded-xl"
                />
              </div>

              {/* Rooms, Bathrooms, Balconies */}
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2 block">Camere</label>
                <Input
                  type="number"
                  value={inputs.rooms}
                  onChange={e => setInputs(prev => ({ ...prev, rooms: Number(e.target.value) || 0 }))}
                  className="h-12 bg-slate-50 border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2 block">Băi</label>
                <Input
                  type="number"
                  value={inputs.bathrooms}
                  onChange={e => setInputs(prev => ({ ...prev, bathrooms: Number(e.target.value) || 0 }))}
                  className="h-12 bg-slate-50 border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2 block">Balcoane</label>
                <Input
                  type="number"
                  value={inputs.balconies}
                  onChange={e => setInputs(prev => ({ ...prev, balconies: Number(e.target.value) || 0 }))}
                  className="h-12 bg-slate-50 border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2 block">Vârstă Clădire (ani)</label>
                <Input
                  type="number"
                  value={inputs.buildingAge}
                  onChange={e => setInputs(prev => ({ ...prev, buildingAge: Number(e.target.value) || 0 }))}
                  className="h-12 bg-slate-50 border-slate-200 rounded-xl"
                />
              </div>

              {/* Status and Luxury */}
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2 block">Stare Finisaje</label>
                <select
                  value={inputs.renovationStatus}
                  onChange={e => setInputs(prev => ({ ...prev, renovationStatus: e.target.value }))}
                  className="w-full h-12 rounded-xl bg-slate-50 border border-slate-200 px-4 text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/20 font-medium"
                >
                  <option value="Ultra-luxury">Ultra-Luxury (Mobilat Designer)</option>
                  <option value="Modern/Renovat">Modern / Renovat recent</option>
                  <option value="Standard">Standard / Finisaje clasice</option>
                  <option value="Necesita renovare">Necesită Renovare integrală</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2 block">Nivel de Lux / Materiale</label>
                <select
                  value={inputs.luxuryLevel}
                  onChange={e => setInputs(prev => ({ ...prev, luxuryLevel: e.target.value }))}
                  className="w-full h-12 rounded-xl bg-slate-50 border border-slate-200 px-4 text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/20 font-medium"
                >
                  <option value="Exclusive/Luxury">Exclusiv / Luxury Estate</option>
                  <option value="Premium">Premium Standard</option>
                  <option value="Standard">Clasa Medie / Standard</option>
                </select>
              </div>

              {/* Proximities & Parking */}
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2 block">Loc de Parcare</label>
                <select
                  value={inputs.parking}
                  onChange={e => setInputs(prev => ({ ...prev, parking: e.target.value }))}
                  className="w-full h-12 rounded-xl bg-slate-50 border border-slate-200 px-4 text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/20 font-medium"
                >
                  <option value="Underground">Subteran / Garaj integrat</option>
                  <option value="Surface">Suprateran privat</option>
                  <option value="None">Fără parcare proprie</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2 block">Clasă Energetică</label>
                <select
                  value={inputs.energyClass}
                  onChange={e => setInputs(prev => ({ ...prev, energyClass: e.target.value }))}
                  className="w-full h-12 rounded-xl bg-slate-50 border border-slate-200 px-4 text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/20 font-medium"
                >
                  <option value="A">Clasa A (Verde / Smart)</option>
                  <option value="B">Clasa B</option>
                  <option value="C">Clasa C sau inferioară</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2 block">Orientare</label>
                <select
                  value={inputs.orientation}
                  onChange={e => setInputs(prev => ({ ...prev, orientation: e.target.value }))}
                  className="w-full h-12 rounded-xl bg-slate-50 border border-slate-200 px-4 text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/20 font-medium"
                >
                  <option value="South-East">Sud-Est (Lumină optimă)</option>
                  <option value="South">Sud (Însorit)</option>
                  <option value="East">Est</option>
                  <option value="North-West">Nord-Vest</option>
                  <option value="North">Nord (Lumină rece)</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2 block">Distanță Metrou / Transport</label>
                <select
                  value={inputs.transportProximity}
                  onChange={e => setInputs(prev => ({ ...prev, transportProximity: e.target.value }))}
                  className="w-full h-12 rounded-xl bg-slate-50 border border-slate-200 px-4 text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/20 font-medium"
                >
                  <option value="Sub 5 minute">Sub 5 minute (de mers pe jos)</option>
                  <option value="5-15 minute">Între 5 și 15 minute</option>
                  <option value="Peste 15 minute">Peste 15 minute</option>
                </select>
              </div>

              {/* Extra proximities & trends */}
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2 block">Școli / Parcuri în zonă</label>
                <select
                  value={inputs.schoolsProximity}
                  onChange={e => setInputs(prev => ({ ...prev, schoolsProximity: e.target.value }))}
                  className="w-full h-12 rounded-xl bg-slate-50 border border-slate-200 px-4 text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/20 font-medium"
                >
                  <option value="Excelenta">Excelentă (în imediata apropiere)</option>
                  <option value="Medie">Medie (necesită transport)</option>
                  <option value="Slaba">Slabă / Absentă</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2 block">Acces Parcuri / Zone Verzi</label>
                <select
                  value={inputs.parksProximity}
                  onChange={e => setInputs(prev => ({ ...prev, parksProximity: e.target.value }))}
                  className="w-full h-12 rounded-xl bg-slate-50 border border-slate-200 px-4 text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/20 font-medium"
                >
                  <option value="Excelenta">Excelent (sub 5 minute)</option>
                  <option value="Medie">Mediu (5-15 minute)</option>
                  <option value="Slaba">Slab / absent</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2 block">Magazine & Restaurante</label>
                <select
                  value={inputs.shoppingProximity}
                  onChange={e => setInputs(prev => ({ ...prev, shoppingProximity: e.target.value }))}
                  className="w-full h-12 rounded-xl bg-slate-50 border border-slate-200 px-4 text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/20 font-medium"
                >
                  <option value="Excelenta">Excelent (zonă activă)</option>
                  <option value="Medie">Mediu</option>
                  <option value="Slaba">Limitat</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2 block">Apropiere Birouri / Hub Business</label>
                <select
                  value={inputs.officesProximity}
                  onChange={e => setInputs(prev => ({ ...prev, officesProximity: e.target.value }))}
                  className="w-full h-12 rounded-xl bg-slate-50 border border-slate-200 px-4 text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/20 font-medium"
                >
                  <option value="Excelenta">Excelentă</option>
                  <option value="Medie">Medie</option>
                  <option value="Slaba">Scăzută</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2 block">Tendința Pieței Imobiliare</label>
                <select
                  value={inputs.marketTrends}
                  onChange={e => setInputs(prev => ({ ...prev, marketTrends: e.target.value }))}
                  className="w-full h-12 rounded-xl bg-slate-50 border border-slate-200 px-4 text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/20 font-medium"
                >
                  <option value="In Crestere">În Creștere accelerată (+5% momentum)</option>
                  <option value="Stabila">Stabilă</option>
                  <option value="In Scadere">În Scădere (-5% contracție)</option>
                </select>
              </div>

              <div className="col-span-1 md:col-span-2 flex items-center gap-3 pt-3">
                <input
                  type="checkbox"
                  id="storage"
                  checked={inputs.storage}
                  onChange={e => setInputs(prev => ({ ...prev, storage: e.target.checked }))}
                  className="w-5 h-5 rounded text-amber-600 border-slate-300 focus:ring-amber-500"
                />
                <label htmlFor="storage" className="text-sm font-bold text-slate-700">Proprietatea include boxă de depozitare la subsol</label>
              </div>
            </div>

            <Button
              onClick={calculateValuation}
              disabled={isCalculating}
              className="w-full h-14 rounded-2xl bg-slate-900 text-white hover:bg-slate-800 font-bold text-lg mt-6 shadow-lg tracking-wide disabled:opacity-75"
            >
              {isCalculating ? "Se calculează algoritmul..." : "Generează Raportul de Evaluare"}
            </Button>
          </div>

          {/* Results Panel */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <AnimatePresence mode="wait">
              {result ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  className="bg-slate-900 text-white p-8 md:p-10 rounded-[2.5rem] border border-slate-800 shadow-2xl flex flex-col justify-between h-full relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />
                  
                  <div>
                    <div className="flex justify-between items-center mb-8 pb-4 border-b border-white/10">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block mb-1">Valoare Estimată</span>
                        <span className="text-4xl md:text-5xl font-heading font-black tracking-tight text-white">
                          €{result.estimatedValue.toLocaleString()}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Preț / mp util</span>
                        <span className="text-lg font-bold text-slate-200">€{result.pricePerSqm} / mp</span>
                      </div>
                    </div>

                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Defalcare Factori de Influență</h4>
                    
                    <div className="space-y-3.5 mb-8">
                      <div className="flex justify-between items-center text-sm py-1.5 border-b border-white/5">
                        <span className="text-slate-400">Valoare de Bază Zonă/Cartier</span>
                        <span className="font-semibold text-slate-200">€{result.valuationBreakdown.baseValue.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm py-1.5 border-b border-white/5">
                        <span className="text-slate-400">Factor Finisare & Design</span>
                        <span className={`font-semibold ${result.valuationBreakdown.renovationAdjustment >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                          {result.valuationBreakdown.renovationAdjustment >= 0 ? "+" : ""}€{result.valuationBreakdown.renovationAdjustment.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-sm py-1.5 border-b border-white/5">
                        <span className="text-slate-400">Nivel Finisaje & Materiale</span>
                        <span className={`font-semibold ${result.valuationBreakdown.luxuryAdjustment >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                          {result.valuationBreakdown.luxuryAdjustment >= 0 ? "+" : ""}€{result.valuationBreakdown.luxuryAdjustment.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-sm py-1.5 border-b border-white/5">
                        <span className="text-slate-400">Factor Vârstă Clădire</span>
                        <span className={`font-semibold ${result.valuationBreakdown.ageAdjustment >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                          {result.valuationBreakdown.ageAdjustment >= 0 ? "+" : ""}€{result.valuationBreakdown.ageAdjustment.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-sm py-1.5 border-b border-white/5">
                        <span className="text-slate-400">Facilități & Proximități (BETA)</span>
                        <span className={`font-semibold ${result.valuationBreakdown.amenitiesAdjustment >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                          {result.valuationBreakdown.amenitiesAdjustment >= 0 ? "+" : ""}€{result.valuationBreakdown.amenitiesAdjustment.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-sm py-1.5 border-b border-white/5">
                        <span className="text-slate-400">Ajustare Trend Piață Locală</span>
                        <span className={`font-semibold ${result.valuationBreakdown.marketTrendAdjustment >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                          {result.valuationBreakdown.marketTrendAdjustment >= 0 ? "+" : ""}€{result.valuationBreakdown.marketTrendAdjustment.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <div className="bg-white/5 p-5 rounded-2xl border border-white/10 flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center shrink-0">
                        <ShieldCheck className="w-6 h-6" />
                      </div>
                      <div>
                        <h5 className="font-bold text-sm text-slate-200 mb-1">Index de Încredere: {result.confidenceScore}%</h5>
                        <p className="text-xs text-slate-400 leading-relaxed">Calculat pe baza a 25+ variabile detaliate. Recomandat pentru planificare financiară.</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button variant="outline" className="w-full h-12 rounded-xl bg-transparent border-white/20 hover:bg-white/5 text-white" asChild>
                      <a href="/contact">Solicită Raport PDF Premium</a>
                    </Button>
                    <p className="text-[10px] text-center text-slate-500 leading-relaxed">
                      * Estimarea este realizată de algoritmul Home Find™ și are caracter consultativ. Valoarea finală poate varia în funcție de negocierile directe și contextul specific al tranzacției.
                    </p>
                  </div>
                </motion.div>
              ) : (
                <div className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-slate-200/60 shadow-xl flex-grow flex flex-col justify-center items-center text-center min-h-[400px]">
                  <Landmark className="w-16 h-16 text-slate-300 mb-6 animate-pulse" />
                  <h4 className="text-xl font-bold font-heading text-slate-800 mb-2">Așteptare Evaluare</h4>
                  <p className="text-slate-500 text-sm max-w-xs leading-relaxed">
                    Completați parametrii din partea stângă și apăsați butonul de generare pentru a calcula valoarea de piață.
                  </p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
