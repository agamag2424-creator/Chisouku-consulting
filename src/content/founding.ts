// Founding-client terms (brief A1). One source for every page, the FAQ and llms.txt.
// Prices, the fee-credit sentence and the payment sentence stay in siteConfig and are not restated here.

export const foundingClientTerms =
  "Founding-client rate: the first three clients pay 50% of list price. In exchange, we ask for a named or anonymised case study, a 20-minute reference call with a future prospect, a written testimonial within two weeks of the readout if you are satisfied, and one warm introduction to a peer. The founding-client rate ends after three clients or on 31 January 2027, whichever comes first.";

/** The places line that follows the terms. The count comes from siteConfig.foundingSlotsRemaining. */
export function foundingPlacesRemaining(places: number): string {
  return `Founding-client places remaining: ${places}.`;
}

/** Terms plus the places line, for any page or answer that states the founding-client rate in full. */
export function foundingClientStatement(places: number): string {
  return `${foundingClientTerms} ${foundingPlacesRemaining(places)}`;
}
