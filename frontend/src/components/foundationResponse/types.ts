export type FoundationResponseApiInput = {
  soilLayers: SoilLayer[];
  width: number;
  load: number;
  eccentricity: number;
}

/**
 * This is your "real" data model for a soil layer.
 * Notice that most fields are optional (can be undefined).
 *
 * In the UI, inputs produce strings, but you *want* numbers for numeric fields.
 * So we convert input strings -> numbers when updating state.
 */
export type SoilLayer = {
  layerNumber: number;
  name?: string;
  level?: number;
  Eoed?: number;
  phi?: number;
  c?: number;
  unitWeight?: number;
};