
import pandas as pd

##
fertility_rate = pd.read_csv("../data/kokonaishedelmallisyys_2000_2016.csv", encoding='utf8')
births = pd.read_csv("../data/syntyneet_lapset_1987_2016.csv", encoding='utf8')

pd.head(fertility_rate)
pd.head(births)
