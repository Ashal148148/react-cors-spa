import * as React from 'react';

const basicStyle = "text-lg"
const titleStyle = "text-3xl underline"

function Terminology(): React.JSX.Element { 
  
  return (
    <div className="Terminology">  
        <div id='title' className={"text-white bg-[url('/src/resources/mlbanner.png')] pt-24 pb-14 bg-bottom bg-cover flex flex-col"}>     
            <p className='text-center w-full h-full font-bold text-5xl brightness-200'>Welcome to BattleCat's HP washing calculator</p>
            <p className='text-center w-full h-full text-2xl'>But what does it all mean</p>
        </div>
        <div id='page-content' className='rounded-t-3xl p-10 bg-[#D4E1F6] -mt-5 flex flex-col'>
          <p className={titleStyle}>Terms:</p>
          <p className={basicStyle}>- "Base INT" is the amount of Ability Points added to INT (including the 4 you start with), not including gears nor Maple Warrior</p>
          <p className={basicStyle}>- "Total INT" is the amount of INT you have with your gears and Maple Warrior </p>
          <p className={basicStyle}>- "MP Wash" is the act of adding 1 fresh AP into MP and then using an AP reset scroll to move the point to a main stat (DEX/STR/INT/LUK). Taking a point out of MP means losing a set amount of MP, for example archers lose 12 MP </p>
          <p className={basicStyle}>- "Stale HP Wash" is the act of using an AP reset scroll to -MP &gt; +HP </p>
          <p className={basicStyle}>- "Fresh AP" are points you get upon leveling up, you can use these points to increase 6 stats HP/MP/DEX/STR/INT/LUK.  </p>
          <p className={basicStyle}>- "Stale AP" are points that will be reset from HP/MP stat into a main stat (DEX/STR/INT/LUK), thus "freeing" the point , for example -MP &gt; +INT. Stale AP can also be used to Stale Wash, doing so the point will remain stale. </p>
          <p className={basicStyle}>- "HP Wash" is the act of turning bonus MP into bonus HP, whether it Stale HP Washing or using a Fresh AP in HP and taking a point out of MP into a main stat </p>
          <p className={titleStyle}> The principles of HP washing: </p>
          <p className={basicStyle}>- The goal of HP washing is to get as much bonus MP as necessary and then wash to reach the desired HP. </p>
          <p className={basicStyle}>- Using fresh AP on HP will cause the stat to raise by a random amount, for example if an archer adds a point to HP they get 16~20 HP randomly </p>
          <p className={basicStyle}>- Using a stale AP on HP, for example -MP &gt; +HP, will always yield the lowest number so 16 for archers </p>
          <p className={basicStyle}>- As an archer using fresh AP on MP will yield MP equal to 10 + 10% of your base INT which means that it yields [(10% of your base INT) - 2] bonus MP, this 2 MP penalty is the same for all classes, for example with 300 base INT every fresh AP in MP yields 28 bonus MP. </p>
          <p className={basicStyle}>- Upon leveling up your character will get 10% of the total INT as bonus MP, for example 120 total INT will yield 12 bonus MP on lvl up. </p>
          <p className={basicStyle}>That is the reason why before leveling up you need to put on your INT gears and get the Maple Warrior buff. </p>
          <p className={basicStyle}>- After adding at least 1 point into MP/HP you can stale wash until you are out of MP. </p>
          <p className={basicStyle}>- Check out this <a className='underline text-blue-500' href='https://forum.maplelegends.com/index.php?threads/nises-hp-washing-formula-compilation.38558/'>post</a> by nise for more details about the number of each class </p>
          <p className={basicStyle}> </p>
          <p className={titleStyle}>Mage washing: </p>
          <p className={basicStyle}> </p>
          <p className={basicStyle}>- MP washing a mage means accumulating more mana by using Fresh AP in MP and using an AP reset scroll to -mp &gt; +INT. </p>
          <p className={basicStyle}>- HP washing a mage means firstly MP washing it carefully (do not reach 30k MP) and using as much bonus MP as you feel like to Stale HP wash (I personally wash down to 29k MP). Mage HP washing is not necessary if you don't plan on bossing with your mage. </p>
          <p className={basicStyle}>- I recommend making an HB mule (lvl 41 spearman) and starting to MP wash at a high lvl, it would cost less NX. Keep MP washing even after you hit 30k MP with HB </p>
          <p className={basicStyle}> </p>
          <p className={titleStyle}>Calculator notes: </p>
          <p className={basicStyle}>- The time needed to vote shown in this calculator is not accurate because the calculation is made with the assumption that you can only get 6.5k NX a day, however that is not 100% accurate since you start at 5k nx per vote and can get up to 7k NX daily by maxing out your streak (6.5k nx) and using the "blue kimmy" (500nx), not to mention NX drops, vote events and event APRs. </p>
          <p className={basicStyle}>- Points in main stat shown in this calculator represent points spent in the 2/3 main stats of the class, the first 20~35 points need to be put in the primary/secondary stat of your class for the 1st job advancement. for example thief needs 25 points in dex, the secondary stat </p>
          <p className={basicStyle}>- Every character is a assumed to have been created with 10 int and 5 main stat </p>
          <p className={basicStyle}>- DRODS $washes command assumes you are using fresh AP each HP wash, which would yield +2 more HP on average, which is why this calculator shows lower results </p>
        </div>
    </div>
  );
}



export default Terminology;