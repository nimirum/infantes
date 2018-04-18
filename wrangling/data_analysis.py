
import pandas as pd

##
fertility_rate = pd.read_csv("../data/kokonaishedelmallisyys_2000_2016.csv", encoding='utf8', sep=';')
births = pd.read_csv("../data/syntyneet_lapset_1987_2016.csv", encoding='utf8', sep=';')

print(fertility_rate.head())
print(births.head())
