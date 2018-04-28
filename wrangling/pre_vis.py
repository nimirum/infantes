# coding=utf-8

import pandas as pd
from plotly.offline import init_notebook_mode, plot
import plotly.graph_objs as go
import plotly.offline as offline
from plotly.graph_objs import Layout
import numpy as np


def plot_test():
    df = get_data()
    df = df[df['Area'] != 'KOKO MAA']
    municipalities = get_kuntadata()
    df = pd.merge(right=municipalities, left=df, how='left', on='Area')
   # print(df.head())

    df['syntvaki'] = df['Births2016'] / df['Population'] * 100
    df = df.sort_values(by='syntvaki')
    #print(df.head())
    df2 = df[['Area', 'Region', 'syntvaki', 'Population', 'Births2016', 'change', 'Unemployment', 'UniversityDegree', 'BirthDeathSum']]
    df2.columns = ['Area', 'Region', 'BirthsPopulationRatio', 'Population', 'Births2016', 'BirthsChange%', 'Unemployment', 'UniversityDegree', 'BirthDeathSum']
    df2.fillna(0, inplace=True)
    df2.replace(-np.inf, 0, inplace=True)
    df2.to_json('births_with_population.json', orient='records', force_ascii=True)
    print(df2.head())

    #init_notebook_mode(connected=False)
    #data = [go.Scatter(
    #    y=df2['Births2016'],
    #    x=df2['Population'],
    #    hoverinfo=df2['Area'],
    #    mode='markers',
    # )]

    #layout = go.Layout(title="Percentage of newborns per population and university degree")
    #fig = go.Figure(data=data, layout=layout)
    #offline.plot(fig)

    '''
    plot({
        "data": data,
        "layout": Layout(title="Testplot")
    }, image='png', image_filename="testplot")
    '''
    print(df2['BirthsChange%'].unique())


def get_data():
    #fertility_rate = pd.read_csv("../data/kokonaishedelmallisyys_2000_2016.csv", encoding='utf8', sep=';')
    births = pd.read_csv("../data/syntyneet_lapset_1987_2016.csv", encoding='utf8', sep=';')

    births2016col = '2016 Sukupuolet yhteensä Elävänä syntyneet, lkm'
    births2015col = '2015 Sukupuolet yhteensä Elävänä syntyneet, lkm'
    births = births.loc[births['Äidin ikä'] == "Ikäluokat yhteensä"]
    births15and16 = births[['Alue', births2015col, births2016col]]
    births15and16 = births15and16.reset_index()

    #print(births15and16.head())

    births15and16['change'] = ((births15and16[births2016col] - births15and16[births2015col]) / births15and16[
        births2016col]) * 100
    births15and16['change'].round(2)
    births15and16 = births15and16.sort_values(['change'], ascending=True)
    births15and16.columns = ['index', 'Area', 'Births2015', 'Births2016', 'change']
    del births15and16['index']

    births15and16['Area'].replace('Maarianhamina - Mariehamn', 'Maarianhamina', inplace=True)

    print(births15and16.head())
    return births15and16


def get_kuntadata():
    muncipilaties = pd.read_csv("../data/kunta_maakunta_yhteys.csv", encoding='utf8', sep='\t')
    muncipilaties = muncipilaties[['Alue', 'maakunta']]
    muncipilaties.columns = ['Area', 'Region']

    print(muncipilaties.head())
    keys = pd.read_csv("../data/kuntien_avainluvut_2000_2017.csv", encoding='utf8', sep=';')

    keys['Alue'] = keys['Alue 2017']
    keys1 = keys[((keys['Tiedot'] == ('Väkiluku')))
                & (keys['Alue'] != 'KOKO MAA')][['2016', 'Alue']].reset_index()
    keys1.columns = ['index', 'Population', 'Area']
    del keys1['index']

    keys2 = keys[( (keys['Tiedot'] == ('Syntyneiden enemmyys, henkilöä')))
                & (keys['Alue'] != 'KOKO MAA')][['2016', 'Alue']].reset_index()
    keys2.columns = ['index', 'BirthDeathSum', 'Area']
    del keys2['index']

    keys3 = keys[((keys['Tiedot'] == ('Korkea-asteen tutkinnon suorittaneiden osuus 15 vuotta täyttäneistä, %')))
                & (keys['Alue'] != 'KOKO MAA')][['2016', 'Alue']].reset_index()
    keys3.columns = ['index', 'UniversityDegree', 'Area']
    del keys3['index']

    keys4 = keys[((keys['Tiedot'] == ('Työttömien osuus työvoimasta, %')))
                & (keys['Alue'] != 'KOKO MAA')][['2016', 'Alue']].reset_index()
    keys4.columns = ['index', 'Unemployment', 'Area']
    del keys4['index']

    keys = pd.merge(right=keys1, left=keys2, how='left', on='Area')
    keys = pd.merge(right=keys, left=keys3, how='left', on='Area')
    keys = pd.merge(right=keys, left=keys4, how='left', on='Area')
    #print(keys.head())
    keys = pd.merge(keys, muncipilaties, on='Area', how='left')
    return keys


if __name__ == "__main__":
    #get_kuntadata()
 plot_test()
