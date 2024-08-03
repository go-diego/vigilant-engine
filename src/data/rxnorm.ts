import {useQuery, UseQueryOptions} from '@tanstack/react-query'
import ky from 'ky'

const BASE_URL = 'https://rxnav.nlm.nih.gov/REST'

type GetSpellingSuggestionsParams = {
  name: string
}
type GetSpellingSuggestionsResponse = {
  suggestionGroup: {
    name: string | null
    suggestionList: {
      suggestion: string[]
    }
  }
}
export const useSpellingSuggestions = (
  params: GetSpellingSuggestionsParams,
  options?: Omit<
    UseQueryOptions<GetSpellingSuggestionsResponse>,
    'queryFn' | 'queryKey'
  >,
) => {
  return useQuery({
    queryKey: ['suggestions', params],
    queryFn: () =>
      ky
        .get(`${BASE_URL}/spellingsuggestions.json`, {searchParams: params})
        .json<GetSpellingSuggestionsResponse>(),
    ...options,
  })
}

type GetDrugsParams = {
  name: string
}
interface ConceptProperty {
  rxcui: string
  name: string
  synonym: string
  tty: string
  language: string
  suppress: string
  umlscui: string
}
interface ConceptGroup {
  tty: string
  conceptProperties?: ConceptProperty[]
}
type GetDrugsResponse = {
  drugGroup: {name: string | null; conceptGroup: ConceptGroup[]}
}
export const useGetDrugs = (
  params: GetDrugsParams,
  options?: Omit<UseQueryOptions<GetDrugsResponse>, 'queryFn' | 'queryKey'>,
) => {
  return useQuery({
    queryKey: ['drugs', params],
    queryFn: () =>
      ky
        .get(`${BASE_URL}/drugs.json`, {searchParams: params})
        .json<GetDrugsResponse>(),
    ...options,
  })
}

type GetAllPropertiesResponse = {
  propConceptGroup: {
    propConcept: {
      propCategory: string
      propName: string
      propValue: string
    }[]
  }
}
export const getAllProperties = (rxcui: string, properties: string[]) => {
  return ky
    .get(
      `${BASE_URL}/rxcui/${rxcui}/allProperties.json?prop=${properties.join(
        '+',
      )}`,
    )
    .json<GetAllPropertiesResponse>()
}

type GetNDCsResponse = {
  ndcGroup: {
    ndcList: {
      ndc: string[]
    }
  }
}
export const useGetNDCs = (
  rxcui: string,
  options?: Omit<UseQueryOptions<GetNDCsResponse>, 'queryFn' | 'queryKey'>,
) => {
  return useQuery({
    queryKey: ['ndcs', rxcui],
    queryFn: () =>
      ky.get(`${BASE_URL}/rxcui/${rxcui}/ndcs.json`).json<GetNDCsResponse>(),
    ...options,
  })
}
