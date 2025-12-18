export type FoundationResponseApiInput = {
  soilLayers: SoilLayer[];
  width: number;
  load: number;
  eccentricity: number;
}

export type SoilLayer = {
  layerNumber: number;
  name: string;
  level: number;
  Eoed: number;
  phi: number;
  c: number;
  unitWeight: number;
}