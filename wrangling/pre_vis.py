import pandas as pd
from plotly.offline import init_notebook_mode, plot
import plotly.graph_objs as go
import plotly.offline as offline
from plotly.graph_objs import Layout
import numpy as np


def get_json_births_data():
    df = get_data()
    df = df[df['Area'] != 'KOKO MAA']
    municipalities = get_kuntadata()
    df = pd.merge(right=municipalities, left=df, how='left', on='Area')

    df['syntvaki'] = df['Births2017'] / df['Population'] * 100
    df = df.sort_values(by='syntvaki')
    df2 = df[['Area', 'Region', 'syntvaki', 'Population', 'Births2015', 'Births2016', 'Births2017',
              'change', 'Unemployment', 'MenUnemployed2016', 'WomenUnemployed2016', 'UniversityDegree', 'BirthDeathSum']]
    df2.columns = ['Area', 'Region', 'BirthsPopulationRatio', 'Population', 'Births2015', 'Births2016', 'Births2017',
                   'BirthsChange%', 'Unemployment', 'MenUnemployed2016', 'WomenUnemployed2016', 'UniversityDegree', 'BirthDeathSum']
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


def get_data():
    births = pd.read_csv("../data/syntyneet_lapset_2000_2017.csv", encoding='utf8', sep=';')

    births2017col = '2017 Sukupuolet yhteensä Elävänä syntyneet, lkm'
    births2016col = '2016 Sukupuolet yhteensä Elävänä syntyneet, lkm'
    births2015col = '2015 Sukupuolet yhteensä Elävänä syntyneet, lkm'
    births = births[['Alue', births2015col, births2016col, births2017col]]
    births = births.reset_index()

    births['change'] = ((births[births2017col] - births[births2016col]) / births[
        births2017col]) * 100
    births['change'].round(2)
    births = births.sort_values(['change'], ascending=True)
    births.columns = ['index', 'Area', 'Births2015', 'Births2016', 'Births2017', 'change']
    del births['index']
    births['Area'].replace('Maarianhamina - Mariehamn', 'Maarianhamina', inplace=True)

    #print(births.head())
    return births


def get_kuntadata():
    muncipilaties = pd.read_csv("../data/kunta_maakunta_yhteys.csv", encoding='utf8', sep='\t')
    muncipilaties = muncipilaties[['Alue', 'maakunta']]
    muncipilaties.columns = ['Area', 'Region']

    unemployment = pd.read_csv("../data/tyottomat_2016.csv", encoding='utf8', sep=';')
    unemployment = unemployment[['Alue', 'Miehet Ikäluokat yhteensä 2016', 'Naiset Ikäluokat yhteensä 2016']]
    unemployment.columns = ['Area', 'MenUnemployed2016', 'WomenUnemployed2016']

    workforce = pd.read_csv("../data/tyovoima_2016.csv", encoding='utf8', sep=';')
    workforce = workforce[['Alue', 'Miehet Ikäluokat yhteensä 2016', 'Naiset Ikäluokat yhteensä 2016']]
    workforce.columns = ['Area', 'MenWorkForce2016', 'WomenWorkForce2016']
    unemployment['MenUnemployed2016'] = (unemployment['MenUnemployed2016'] / workforce['MenWorkForce2016']) * 100
    unemployment['WomenUnemployed2016'] = (unemployment['WomenUnemployed2016'] / workforce['WomenWorkForce2016']) * 100
    muncipilaties = pd.merge(right=muncipilaties, left=unemployment, how='left', on='Area')
    #print(muncipilaties.head())

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
    get_json_births_data()
