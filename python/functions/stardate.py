import datetime
from decimal import Decimal

#declaracao de classe
class StarDate:
    #constantes
    __START_DATE_MINUTES = Decimal("526.3158948224907")
    __START_STAR_DATE =  Decimal("100590.29")
    __START_DATE_TIME = datetime.datetime(2022,12,29,0,0)

     #construtor
    def __init__(self,date=datetime.datetime.now()) -> None:
        #variável privada  
        self.__date = date
    
    #funcoes
    def tofloat(self):
        diffSeconds = Decimal( (self.__date - StarDate.__START_DATE_TIME).total_seconds())
        diffMinutes = diffSeconds / Decimal(60)
        newStarDate =  StarDate.__START_STAR_DATE + (diffMinutes /  StarDate.__START_DATE_MINUTES)
        return float(newStarDate)
    
    def toString(self,fmt="0.2f"):
        return format(self.tofloat(),fmt)


#date = datetime.datetime.now()
date = datetime.datetime(2012,2,29,0,0)
starDate = StarDate(date)
 
starDate.__date =  datetime.datetime(2010,2,22,0,0)

print(starDate.toString("0.3f"))