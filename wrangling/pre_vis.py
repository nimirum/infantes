import pandas as pd
from plotly.offline import init_notebook_mode, plot
import plotly.graph_objs as go
import plotly.offline as offline
from plotly.graph_objs import Layout


def plot_test():
    df = get_data()
    df = df[df['Alue'] != 'KOKO MAA']
    vakiluvut = get_kuntadata()
    df = pd.merge(right=vakiluvut, left=df, how='left', on='Alue')
    df['syntvaki'] = (df['2016 Sukupuolet yhteensä Elävänä syntyneet, lkm'] /df['2016']) * 100
    df = df.sort_values(by='syntvaki')
    print(df.head())


    init_notebook_mode(connected=False)
    data = [go.Bar(
        y=df['syntvaki'],
        x=df['Alue'],
    )]
    layout = go.Layout(title="Percentage of newborns per population")
    fig = go.Figure(data=data, layout=layout)
    offline.plot(fig)
    '''
    plot({
        "data": data,
        "layout": Layout(title="Testplot")
    }, image='png', image_filename="testplot")
    '''


def get_data():
    #fertility_rate = pd.read_csv("../data/kokonaishedelmallisyys_2000_2016.csv", encoding='utf8', sep=';')
    births = pd.read_csv("../data/syntyneet_lapset_1987_2016.csv", encoding='utf8', sep=';')

    births2016col = '2016 Sukupuolet yhteensä Elävänä syntyneet, lkm'
    births2015col = '2015 Sukupuolet yhteensä Elävänä syntyneet, lkm'
    births = births.loc[births['Äidin ikä'] == "Ikäluokat yhteensä"]
    births15and16 = births[['Alue', births2015col, births2016col]]
    births15and16 = births15and16.reset_index()

    print(births15and16.head())

    births15and16['change'] = ((births15and16[births2016col] - births15and16[births2015col]) / births15and16[
        births2016col]) * 100
    births15and16['change'].round(2)
    births15and16 = births15and16.sort_values(['change'], ascending=True)
    print(births15and16.head())
    return births15and16
def get_kuntadata():
    keys = pd.read_csv("../data/kuntien_avainluvut_2000_2017.csv", encoding='utf8', sep=';')
    keys['Alue'] = keys['Alue 2017']
    keys = keys[(keys['Tiedot'] == 'Väkiluku') & (keys['Alue'] != 'KOKO MAA')][['2016', 'Alue']].reset_index()

    print(keys.head())
    return keys

if __name__ == "__main__":
    #get_kuntadata()
    plot_test()
