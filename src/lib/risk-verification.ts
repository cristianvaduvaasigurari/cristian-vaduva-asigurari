/**
 * Risk Verification & Advisory Calculation Engine
 * Pure mathematical functions for all risk checks and insurance calculations.
 * Single source of truth — completely isolated, typed, and unit-tested.
 */

export interface ReconstructionCostInputs {
  builtAreaSqM: number;
  costPerSqM: number;
  finishesAllowance: number;
  additionalCosts: number;
  existingInsuredSum?: number;
}

export interface ReconstructionCostResult {
  baseCost: number;
  totalEstimatedReconstruction: number;
  coverageGap?: number; // positive = underinsurance (deficit), negative = overinsurance
  underinsuranceRatio?: number;
}

export function calculateReconstructionCost(inputs: ReconstructionCostInputs): ReconstructionCostResult {
  const area = Math.max(0, inputs.builtAreaSqM || 0);
  const unitCost = Math.max(0, inputs.costPerSqM || 0);
  const finishes = Math.max(0, inputs.finishesAllowance || 0);
  const additional = Math.max(0, inputs.additionalCosts || 0);

  const baseCost = Math.round(area * unitCost);
  const totalEstimatedReconstruction = Math.round(baseCost + finishes + additional);

  let coverageGap: number | undefined;
  let underinsuranceRatio: number | undefined;

  if (typeof inputs.existingInsuredSum === 'number' && inputs.existingInsuredSum > 0) {
    coverageGap = Math.round(totalEstimatedReconstruction - inputs.existingInsuredSum);
    underinsuranceRatio = totalEstimatedReconstruction > 0
      ? Number((inputs.existingInsuredSum / totalEstimatedReconstruction).toFixed(2))
      : 1;
  }

  return {
    baseCost,
    totalEstimatedReconstruction,
    coverageGap,
    underinsuranceRatio,
  };
}

export type CascoDeductibleType = 'fixed' | 'percentage_damage' | 'percentage_insured_sum';

export interface CascoDeductibleInputs {
  damageAmount: number;
  deductibleType: CascoDeductibleType;
  deductibleValue: number; // e.g. 100 EUR, or 10%
  insuredSum?: number; // needed if percentage of insured sum
  minimumThreshold?: number; // e.g. min 100 EUR
  /**
   * Illustrative economic total-loss threshold (e.g. 75%, 80%).
   * Not a universal statutory rule; contractual threshold defined by each insurer's policy terms.
   * Defaults to 75% as an illustrative Romanian market reference.
   */
  totalLossThresholdPct?: number;
}

export interface CascoDeductibleResult {
  totalDamage: number;
  calculatedDeductible: number;
  policyholderShare: number;
  insurerShare: number;
  isTotalLoss: boolean;
  totalLossThresholdPctUsed: number;
}

export function calculateCascoDeductible(inputs: CascoDeductibleInputs): CascoDeductibleResult {
  const damage = Math.max(0, inputs.damageAmount || 0);
  const val = Math.max(0, inputs.deductibleValue || 0);
  const minThreshold = Math.max(0, inputs.minimumThreshold || 0);
  const sumInsured = Math.max(0, inputs.insuredSum || 0);
  const thresholdPct = inputs.totalLossThresholdPct && inputs.totalLossThresholdPct > 0 
    ? inputs.totalLossThresholdPct 
    : 75;

  let rawDeductible = 0;
  if (inputs.deductibleType === 'fixed') {
    rawDeductible = val;
  } else if (inputs.deductibleType === 'percentage_damage') {
    rawDeductible = (damage * val) / 100;
  } else if (inputs.deductibleType === 'percentage_insured_sum') {
    rawDeductible = (sumInsured * val) / 100;
  }

  const effectiveDeductible = Math.max(rawDeductible, minThreshold);
  // Deductible cannot exceed damage
  const policyholderShare = Math.round(Math.min(damage, effectiveDeductible));
  const insurerShare = Math.round(Math.max(0, damage - policyholderShare));
  
  // Economic total loss: illustrative comparison against user-selected or typical contractual threshold
  const isTotalLoss = sumInsured > 0 && damage >= (sumInsured * thresholdPct) / 100;

  return {
    totalDamage: Math.round(damage),
    calculatedDeductible: Math.round(effectiveDeductible),
    policyholderShare,
    insurerShare,
    isTotalLoss,
    totalLossThresholdPctUsed: thresholdPct,
  };
}

export interface LifeNeedsInputs {
  annualIncome: number;
  yearsToReplace: number;
  mortgageDebt: number;
  otherDebts: number;
  familyObligations: number; // e.g. education, buffer
  liquidSavings: number;
  existingLifeInsurance: number;
}

export interface LifeNeedsResult {
  incomeReplacementNeed: number;
  totalDebts: number;
  totalObligations: number;
  grossCapitalNeed: number;
  availableResources: number;
  protectionGap: number; // Deficit de protectie
}

export function calculateLifeCoverageNeeds(inputs: LifeNeedsInputs): LifeNeedsResult {
  const income = Math.max(0, inputs.annualIncome || 0);
  const years = Math.max(0, inputs.yearsToReplace || 0);
  const mortgage = Math.max(0, inputs.mortgageDebt || 0);
  const otherDebts = Math.max(0, inputs.otherDebts || 0);
  const familyObligations = Math.max(0, inputs.familyObligations || 0);
  const savings = Math.max(0, inputs.liquidSavings || 0);
  const existingLife = Math.max(0, inputs.existingLifeInsurance || 0);

  const incomeReplacementNeed = Math.round(income * years);
  const totalDebts = Math.round(mortgage + otherDebts);
  const totalObligations = Math.round(familyObligations);
  const grossCapitalNeed = incomeReplacementNeed + totalDebts + totalObligations;
  const availableResources = Math.round(savings + existingLife);
  const protectionGap = Math.max(0, grossCapitalNeed - availableResources);

  return {
    incomeReplacementNeed,
    totalDebts,
    totalObligations,
    grossCapitalNeed,
    availableResources,
    protectionGap,
  };
}

export interface MortgageProtectionInputs {
  outstandingLoanBalance: number;
  monthlyInstalment: number;
  scenarioMonths: 12 | 24;
  existingLifeInsurance?: number;
}

export interface MortgageProtectionResult {
  outstandingLoanBalance: number;
  monthlyInstalment: number;
  temporaryInstalmentExposure: number;
  totalExposure: number;
  remainingUncoveredExposure: number;
}

export function calculateMortgageProtection(inputs: MortgageProtectionInputs): MortgageProtectionResult {
  const balance = Math.max(0, inputs.outstandingLoanBalance || 0);
  const monthly = Math.max(0, inputs.monthlyInstalment || 0);
  const months = inputs.scenarioMonths === 24 ? 24 : 12;
  const existing = Math.max(0, inputs.existingLifeInsurance || 0);

  const temporaryInstalmentExposure = Math.round(monthly * months);
  const totalExposure = Math.round(balance);
  const remainingUncoveredExposure = Math.max(0, totalExposure - existing);

  return {
    outstandingLoanBalance: Math.round(balance),
    monthlyInstalment: Math.round(monthly),
    temporaryInstalmentExposure,
    totalExposure,
    remainingUncoveredExposure,
  };
}

export interface KeyPersonInputs {
  equityValueEur: number;
  coSignedLiabilitiesEur: number;
  annualTurnoverEur: number;
  keyPersonContributionPct: number; // 0 - 100%
  replacementCostEur: number; // headhunter + onboarding + loss of contracts
  existingReservesEur: number;
}

export interface KeyPersonResult {
  equityValueEur: number;
  coSignedLiabilitiesEur: number;
  annualTurnoverAtRiskEur: number;
  totalGrossExposureEur: number;
  netProtectionNeedEur: number;
}

export function calculateKeyPersonExposure(inputs: KeyPersonInputs): KeyPersonResult {
  const equity = Math.max(0, inputs.equityValueEur || 0);
  const liabilities = Math.max(0, inputs.coSignedLiabilitiesEur || 0);
  const turnover = Math.max(0, inputs.annualTurnoverEur || 0);
  const pct = Math.min(100, Math.max(0, inputs.keyPersonContributionPct || 0));
  const replacement = Math.max(0, inputs.replacementCostEur || 0);
  const reserves = Math.max(0, inputs.existingReservesEur || 0);

  const annualTurnoverAtRiskEur = Math.round((turnover * pct) / 100);
  const totalGrossExposureEur = Math.round(equity + liabilities + annualTurnoverAtRiskEur + replacement);
  const netProtectionNeedEur = Math.max(0, totalGrossExposureEur - reserves);

  return {
    equityValueEur: Math.round(equity),
    coSignedLiabilitiesEur: Math.round(liabilities),
    annualTurnoverAtRiskEur,
    totalGrossExposureEur,
    netProtectionNeedEur,
  };
}

export interface BusinessInterruptionInputs {
  monthlyGrossProfit: number; // Venituri minus costuri variabile directe
  interruptionMonths: number; // 1 - 24
  monthlyContinuingFixedExpenses: number; // salarii, chirii, rate, utilitati de mentenanta
}

export interface BusinessInterruptionResult {
  monthlyGrossProfit: number;
  interruptionMonths: number;
  lostProfitExposure: number;
  continuingExpensesExposure: number;
  totalInterruptionExposure: number;
}

export function calculateBusinessInterruption(inputs: BusinessInterruptionInputs): BusinessInterruptionResult {
  const monthlyProfit = Math.max(0, inputs.monthlyGrossProfit || 0);
  const months = Math.min(36, Math.max(1, inputs.interruptionMonths || 1));
  const fixedExpenses = Math.max(0, inputs.monthlyContinuingFixedExpenses || 0);

  const lostProfitExposure = Math.round(monthlyProfit * months);
  const continuingExpensesExposure = Math.round(fixedExpenses * months);
  const totalInterruptionExposure = lostProfitExposure + continuingExpensesExposure;

  return {
    monthlyGrossProfit: Math.round(monthlyProfit),
    interruptionMonths: months,
    lostProfitExposure,
    continuingExpensesExposure,
    totalInterruptionExposure,
  };
}

export interface CmrVsCargoInputs {
  cargoInvoiceValueEur: number;
  cargoGrossWeightKg: number;
  /**
   * Illustrative conversion rate: 1 SDR (DST / XDR) to EUR.
   * The statutory CMR cap is defined exclusively in SDR (Special Drawing Rights).
   * Conversion into EUR is strictly illustrative; actual conversion fluctuates daily
   * based on the IMF (FMI) currency basket and is determined on the payment/loss date.
   * Defaults to 1.25 as an illustrative assumption (not a live automated quote).
   */
  sdrToEurRate?: number;
}

export interface CmrVsCargoResult {
  cargoInvoiceValueEur: number;
  cargoGrossWeightKg: number;
  cmrLimitPerKgSdr: number; // Exactly 8.33 SDR / kg under Art. 23(3) CMR Protocol 1978
  cmrStatutoryCapSdr: number; // Weight in kg * 8.33 SDR
  sdrToEurRateUsed: number;
  cmrLimitPerKgEur: number;
  cmrStatutoryCapEur: number;
  cargoPolicyIndemnityEur: number;
  uncompensatedLossEur: number;
  uncompensatedLossPct: number;
}

export function calculateCmrVsCargo(inputs: CmrVsCargoInputs): CmrVsCargoResult {
  const value = Math.max(0, inputs.cargoInvoiceValueEur || 0);
  const weight = Math.max(0, inputs.cargoGrossWeightKg || 0);
  const sdrRate = inputs.sdrToEurRate && inputs.sdrToEurRate > 0 ? inputs.sdrToEurRate : 1.25;

  // Under CMR Convention Art. 23(3) (Geneva 1956 amended by Protocol 1978):
  // Carrier liability is capped at 8.33 Special Drawing Rights (SDR / DST) per kg gross weight
  const cmrLimitPerKgSdr = 8.33;
  const cmrStatutoryCapSdr = Number((weight * cmrLimitPerKgSdr).toFixed(2));
  
  // Converted EUR values using the specified / reference IMF rate
  const cmrLimitPerKgEur = Number((cmrLimitPerKgSdr * sdrRate).toFixed(2));
  const rawConvertedCapEur = Math.round(cmrStatutoryCapSdr * sdrRate);
  const cmrStatutoryCapEur = Math.round(Math.min(value, rawConvertedCapEur));
  
  // Cargo insurance indemnifies 100% of declared invoice value
  const cargoPolicyIndemnityEur = Math.round(value);
  const uncompensatedLossEur = Math.max(0, value - cmrStatutoryCapEur);
  const uncompensatedLossPct = value > 0 ? Math.round((uncompensatedLossEur / value) * 100) : 0;

  return {
    cargoInvoiceValueEur: Math.round(value),
    cargoGrossWeightKg: Math.round(weight),
    cmrLimitPerKgSdr,
    cmrStatutoryCapSdr,
    sdrToEurRateUsed: sdrRate,
    cmrLimitPerKgEur,
    cmrStatutoryCapEur,
    cargoPolicyIndemnityEur,
    uncompensatedLossEur,
    uncompensatedLossPct,
  };
}
