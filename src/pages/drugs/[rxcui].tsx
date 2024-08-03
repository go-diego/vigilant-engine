import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {GetServerSidePropsContext} from 'next'
import {getAllProperties, useGetNDCs} from '@/data/rxnorm'

export default function DrugDetails({
  name,
  synonym,
  rxcui,
}: {
  name: string
  synonym: string
  rxcui: string
}) {
  const {data: ndcData} = useGetNDCs(rxcui)
  const ndcs = ndcData?.ndcGroup?.ndcList?.ndc || []

  return (
    <div className="flex flex-col h-full">
      <div className="container max-w-3xl mx-auto gap-8 flex flex-col py-12">
        <div className="flex flex-col gap-1">
          <h1 className="text-xl font-bold tracking-tighter">{synonym}</h1>
          <h2>{name}</h2>
          <p className="text-muted-foreground font-bold">RXCUI: {rxcui}</p>
        </div>
        <Card className="w-full">
          <CardHeader>
            <CardTitle>National Drug Codes</CardTitle>
          </CardHeader>
          <CardContent>
            <ul>
              {ndcs.map((ndc) => (
                <li key={ndc}>{ndc}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const {rxcui} = context.params as {rxcui: string}
  let name = ''
  let synonym = ''

  const data = await getAllProperties(rxcui, ['names'])
  name =
    data.propConceptGroup.propConcept.find(
      (prop) => prop.propName === 'RxNorm Name',
    )?.propValue || ''
  synonym =
    data.propConceptGroup.propConcept.find(
      (prop) => prop.propName === 'RxNorm Synonym',
    )?.propValue || ''

  if (!synonym) {
    synonym =
      data.propConceptGroup.propConcept.find((prop) =>
        prop.propName.toLowerCase().includes('synonym'),
      )?.propValue || ''
  }

  return {
    props: {
      name,
      synonym,
      rxcui,
    },
  }
}
