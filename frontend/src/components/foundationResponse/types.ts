export type FoundationResponseApiInput = {
  soilLayers: SoilLayer[];
  width: number;
  load: number;
  eccentricity: number;
}

export type SoilLayer = {
  name: string;
  level: number;
  Eoed: number;
  phi: number;
  c: number;
  unitWeight: number;
}