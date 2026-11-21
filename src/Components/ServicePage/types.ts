/* Shared data shapes for the service/category pages. The existing arrays in
   src/Data/* already match these, so pages pass them straight through. */

export interface ServiceFeature {
  heading: string;
  content: string;
}

export interface ServiceStep {
  image: string;
  heading: string;
  desc: string;
}

export interface ServiceImage {
  image: string;
}

export interface ServiceFaq {
  question: string;
  answer: string;
}

export interface ServiceLink {
  label: string;
  path: string;
}
