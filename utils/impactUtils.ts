export interface ImpactData {
  craterDiameter: number;
  blastRadius: number;
  thermalRadius: number;
}

export function calculateImpactRadius
  (diameter: number, density: number, velocity: number, angle: number = 90): ImpactData {
  const pi = Math.PI;
  const g = 9.81;  // Gravity (m/s²)
  const targetDensity = 3000;  // Earth surface density (kg/m³)
  const craterConstant = 1.3;  // Typical scaling factor for rock
  const blastFactor = 0.28;  // Empirical blast constant
  const thermalFactor = 1.5; // Factor for thermal radiation effects

  // Convert diameter from km to meters
  const radius = (diameter * 1000) / 2;

  // Calculate mass of asteroid
  const volume = (4 / 3) * pi * Math.pow(radius, 3);
  const mass = volume * density;

  // Convert velocity from km/s to m/s
  const velocity_m = velocity * 1000;

  // Calculate kinetic energy (Joules)
  const kineticEnergy = 0.5 * mass * Math.pow(velocity_m, 2);

  return {
    craterDiameter: (craterConstant * Math.pow(kineticEnergy / (targetDensity * g), 1 / 3.4)) / 1000, // Convert to km
    blastRadius: (blastFactor * Math.pow(kineticEnergy, 1 / 3)) / 1000, // Convert to km
    thermalRadius: (thermalFactor * Math.pow(kineticEnergy, 1 / 4)) / 1000, // Convert to km
  };
}
