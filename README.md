# Health

## Update

I still have some work to do on the demo and I'm fairly certain that there are some bugs I haven't found yet but this should be very close to what 1.0 version will look like.  I don't expect any major changes short of bug fixes for now so feel free to use it and let me know if you run into any issues.


## Introduction

RPG Maker MV gives you a lot of fine-grained control over your game, but it’s primarily geared towards the creation of the JRPGs.  This means that certain aspects of some of the classic WRPGs that I grew up with, like Ultima and Dungeons & Dragons, aren’t supported by default.  Well, I’d like to fix that!  

Adventuring is dangerous business.  Imagine your party climbing the tallest mountain in the world.  The icy wind howls as you all attempt to stave off the cold.  Nights are treacherous and not just because monsters are about.  The temperature drops to an unmanageable degree.  You must find shelter and build a fire in order to avoid freezing to death.  You packed as much food and water as you could but reaching the top of the mountain is taking a lot longer than anyone expected.  The monsters roaming this rarely travelled location are fierce and relentless.  Exhaustion is setting in as sleep is hard to come by.  Will you live to reach the peak?  Will you have enough strength left to fight the White Dragon who lives at the top and guards an ancient artifact that you desperately need to fulfill your quest?

This plugin requires FROG Core to be installed.

![Cold](/img/snap01.png)
###### Or, you know, there’s always this.

One element that used to be very common in classic WRPGs is extra parameters for health beyond the physical which is typically designated as HP or Life.  These extra parameters are typically things that a real, living human being, or whatever race they may be, couldn’t survive or function without: Food, Water, Oxygen, Normal Body Temperature, their Mind/Psyche/Sanity and so on.  Some games even divided a character’s overall HP into different body parts with varying side-effects attributed to low health in each.  A busted leg would slow you down.  A mangled arm would make it impossible to carry a shield.  A serious head wound might knock you out for while.

That’s where FROG_Health comes into play.  Instead of taking the easy route and just making some extra variables that you can manipulate, I've gone and done something a little crazy.  I've added full-blown extra HP stats to RPG Maker MV that are completely customizable.  Better yet, I've provided a way to set environmental conditions that change the way your custom Health HP operates.  For instance, you can define an Oxygen HP stat for your actors which normally would rise every few steps and be full most of the time.  Go underwater, though, and the plugin can set a Condition which will start depleting your Oxygen HP.  You also have the ability to tie States to different levels of HP (normal or Health HP) so that if your character's Oxygen completely runs out, they die.  Even better, you can create Skills and Items that apply to your new Health HP stats the same exact way they would apply to normal HP.  Want to give an enemy a Choke attack or have your Wizard casting a suffocation spell?  No problem.  I've got you covered.


## Features

* Add as many extra HP stats to your game: Food, Water, Rest, Oxygen, Psyche, Body Temperature or whatever else you can think of.
* Automatically control how they function.  You can set them up to increase, decrease or converge towards the middle at any rate you'd like based on steps taken.
* Create and set Conditions that make your players fight harsh weather and envirnments that change how the auto-control works.  Extreme heat or cold can kill you.  A stale bog can inflict disease.  Terror can wrack you mind.
* Create Skills and Items that damage multiple forms of Health HP.
* Customize your actor's battle status window and enemy visual Health gauges.
* Customize the standard Status window to show each actor's Health HP.
* Integration with FROG Race Core.
* Configure Health HP to deplete normal HP, MP or a different Health HP if it falls into the negative.


## How to Use

This plugin has a crap-ton of parameters so that you can configure this system work however you need for your game.  Ready to get crunchy?


### Settings

**Health Config** - Add various aspects of health to your game.  This is the meat and potatoes of this plugin.  This parameter allows you to add additional HP stats to your game.  Maybe you want to make Food, Water and Rest.  A horror game could utilize Sanity or Fear.  Maybe you want to have a system where Head, Body, Arms and Legs each have their own HP bars.  It’s completely customizable so whatever you want to do will probably work.
* **Name** - The name of this aspect of health.
* **Description** - General description about this aspect of health.
* **Abbreviation** - The key that you’ll use to identify this aspect of health in script calls, plugin commands and even in formula boxes if you wish.
* **Max Health** - Number representing this aspects full health value.
* **Control** - Controls how the value is applied.
  * **Decremental** - Health value decreases over time.
  * **Equilibrium** - Health value rises or falls until it reaches the midpoint.
  * **Incremental** - Health value increases over time.
* **Every X Steps** - How often the Auto-Adjust value is applied based on steps taken.
* **Value** - The health value will rise or fall by this based on the Control parameter.
* **State Management** - Low health in different areas apply States to a character.  You can define how that works here by specifying the range of HP that the State will be automatically applied and the likelihood it will happen.  Imagine that you have a Rest health attribute.  If a character’s Rest falls below 40%, you could apply a Tired state which maybe reduces their hit accuracy a little.  At 15%, maybe you replace the Tired state with Exhausted which also lowers their Attack as well.  If it gets all the way down to 0, they could fall asleep.
  * **Description** - Label to let you know what this entry is doing.  Not required but recommended.
  * **State Id** - The State that is applied or removed depending whether the actor’s health score falls within the Min and Max HP.
  * **Type** - Indicates whether Min HP and Max HP represent exact values or percentage of max health HP.
    * **Explicit Value** - Min and Max HP are used as exact values.  If Max HP is 30, the State will apply at exactly 30 HP even if the actor’s maximum Health HP is 200.
    * **Percentage** - This uses the percentage of an actor’s maximum Health HP.  If Max HP is set to 30 and their maximum Health HP is 200, the State will apply at 60 HP.
* **Min HP** - The minimum Health HP that this State will be applied.
* **Max HP** - The maximum Health HP that this State will be applied.
* **Add Percentage** - Odds per step that this State will be applied to any actor that falls within the min/max range.
* **Remove Percentage** - Odds per step that this State will be removed for any actor that falls outside of the min/max range.
* **Adjustments** - Different actors, classes, races, states, equipment and items can affect how State Management functions.  A Sea Elf may be able to hold their breath three times as long as a human underwater.  Flame Armor can help you withstand extreme heat.  Paladins have extraordinary willpower.  All of these work mostly the same.  They just apply to different aspects of the game.
  * **Description** - Description so you know what this entry is. Recommended but not required.
  * **Id** - The actor, class, race, state, item, weapon or armor that adjusts the default health State Management values.
  * **Value** - The default Value will be adjusted by this amount.
  * **Steps** - The default Every X Steps will be adjusted by this amount.
  * **Add Percentage** - The default Add Percentage will be adjusted by this percent.  This value is multiplied by the State Management’s Add Percentage as well as all other adjustments.  100% means that it stays the same.  50% mean that it cuts it in half and 200% would double the odds.  This works like applying multiple Elemental Chance traits.
  * **Remove Percentage** - Works just like Add Percent but applies to the Remove Percentage chance.
  * **Bonus/Penalty** - Static bonus or penalty that applies to Max HP.  If you wanted a piece of equipment to add +30 to a Health HP’s Max, add that here.
  * **Immune** - Disables Health adjustments when true.  If you disabled an Oxygen attribute, your character could effectively breath underwater.  Their Oxygen HP wouldn’t change while disabled.
  * **Visible** - Actors, class and races can be configured to hide this Health HP attribute so that this character doesn’t appear to have it at all.  Make sure you set Immune to false if if you want to completely eliminate this Health attribute for this character.
* **Enemy Parameters** - If your actors have to deal with various levels of Health, their foes should need to as well.  Enemies don’t typically persist beyond battle so this parameter just allows you to set the default Min and Max percentage range for all enemies.  If this is not set, the range will default to the optimum 50% range according to the gauges Control.  A Decremental gauge will be 50%-100%; an Incremental will be 0%-50%; and Equilibrium defaults to 25%-75%.  These defaults can be overridden here.
  * **Min Percent** -  Minimum percentage of Health HP enemies start battle with.
  * **Max Percent** -  Maximum percentage of Health HP enemies start battle with.
* **Show in Battle Log** - Show or hide damage to this Health in the Battle Log.
* **Recover All** - Health HP recovers to optimum value when Recover All command is executed.
* **Battle Gauge Color** - Customize the battle gauge color.
* **Drain Health Abbr** - Normally, when a Health HP bar runs out, that’s it.  Most of the time, something really bad happens like they die, fall asleep, go insane or whatever.  But maybe you don’t want it to be so drastic.  Maybe running out food or water doesn’t kill you but starts draining your normal HP.  In systems where normal HP is split into different Health HP stats like (Head, Body, Arms and Legs), you probably want negative health in those areas to start damaging the character’s normal HP.  By specifying an abbreviation, when this Health is at critical levels as defined by the Control parameter, excess is applied to the other Health stat.  You can also use HP or MP here.

![status](/img/snap04.png)

**Basic State Management** - Wouldn’t it be nice if have low HP, MP or TP could also apply States like Health HP does?  Wouldn’t it be nice we even went a step farther and granted a nice little bonus when these attributes are nearly full?  Of course it would so that why you can now extend this kind of functionality to your normal HP stats.
* **HP State Management** - Configured just like State Management but for normal HP.
* **MP State Management** - Configured just like State Management but for MP.
* **TP State Management** - Configured just like State Management but for TP.  Not sure how useful this one is but it’s here anyway.

**Conditions** - Add conditions that alter the way specific Health aspects function for all party members.  Many different environments can change the way Health HP work.  Going underwater will deplete your Oxygen.  An icy tundra could freeze an unprepared adventurer to death.  Travelling through a desert can give you heat stroke and drain your Water HP quicker.  A stale bog might have a chance to infect you with a rare disease.  No longer can your adventurers brave harsh conditions without feeling it’s effects.  Some Conditions may not affect Health at all but are just used to turn day into night or make ranged attacks less effective if it happens to be especially windy outside.
* **Name** - Name of the Condition.
* **Description** - Description of the Condition.
* **Icon Id** - In the top right-hand corner of the default Status Window, this icon will show when this Condition is active.
* **Adjust Health** - Conditions change the way Health HP normally functions.  Some Health aspects, like Food and Water, naturally deplete over time.  Others, like Oxygen, are naturally available.  Conditions change this.  Getting sealed in an airtight room will deprive you of Oxygen.  Cold weather will lower your Body Temperature.  You could even have it so that just hanging out at the tavern raise your Water HP.
  * **Health Abbr** - Abbreviation for the aspect of Health that is affected.
  * **Control** - Resets the ways that the gauge operates.  Normally, Oxygen would increment over time and usually be maxed out but if the party went underwater, their Oxygen would start decreasing instead.
  * **Adjust Value** - Adds to the default Health Value.
  * **Adjust Steps** - Adds to the default Every X Steps.
  * **Lower Health Range** - Some conditions can only lower a value so far.  Just regular cold weather isn’t going to kill anyone.  It might just lower their body temperature down to a certain point and no more.  Thin air in the mountains won’t suffocate you but it may deplete some of your Oxygen.  This value is the lowest that the Condition can drop you to.
  * **Upper Health Range** - Same as the Lower Health Range but applies to the upper bound.
  * **Immune** - Disables Health adjustments when true.
* **Set Common Event** - Common Event that will run when this Condition becomes active.  Say you have a Night condition.  You could tint the screen dark.  A Cold condition may have a chance to make it start snowing.  Perhaps you need remove other conditions when this one becomes active.
* **Remove Common Event** - Same as the Add version but triggers when this Condition is removed.
* **Immune** - Actors, classes, races, items, equipment and states that make one immune to this condition are defined here.  

**Formula Config** - By now, you might be wondering how these Health attributes work in battle.  For the most part, they work just like normal HP.  This changes some dynamics, though.  If you have Rest HP, why have a Sleep spell that succeeds or fails based on random chance?  You could make Sleep do Rest damage now.  Charm and Fascination could attack the mind.  You could even have a suffocation spell suck the air out your enemy’s lungs (assuming they have lungs).  Your Skill list is about to get a lot more interesting.
* **Name** - The name of this formula.  The editor doesn’t have any way to handle a Skill that does damage to HP, Food and Water.  So to make this possible, you can now enter the name of a formula here and place that name within quotes in the formula box of a Skill or Item.  If you enter ‘quake’ or “quake” into the formula box (with the quotes), the Skill or Item will reference the formula with the name quake.
* **Damage** - Define however many damage formulas you need and which aspects of Health are affected.  Use hp, mp or tp if you want to affect these attributes.
  * **Health Abbr** - The Health abbreviation this formula applies to.
  * **Formula** - Enter the formula just as you would in the normal formula box except now you get a nice big, multi-line note box.  How freakin’ sweet is that?
  * **Flip Damage** - If the damage type is set to HP Damage, it flips to HP Recovery for this Health attribute.  HP Recovery becomes HP Damage.  Sometimes you may need to damage some health while recovering one or more others (or vise versa).
  * **Min 1 Damage** - This formula will always do at least 1 damage.
Register as Damage - This Skill counts as a hit and will activate a State's Remove by Damage property.  A Sleep skill that wakes up its target isn’t of much use so you should turn this off in situations like this.
* **Register as Damage** - This Skill counts as a hit and will activate a State's Remove by Damage property.  A Sleep skill that wakes up its target isn’t of much use so you should turn this off in situations like this.

![Formula](/img/snap05.png)

**Actor Config** - Configure actor specific properties.
* **Description** - Description so you know what this entry is. Recommended but not required.
* **Actor Id** - The actor these properties apply to.
* **Custom Terms** - Change the names for HP, MP and/or TP for this actor.  Sometimes, these terms just don’t fit for everyone, especially MP.
  * **HP Name** - Change the term HP for this actor.
  * **HP Abbr** - Change the term HP (abbr.) for this actor.
  * **MP Name** - Change the term HP for this actor.
  * **MP Abbr** - Change the term HP (abbr.) for this actor.
  * **TP Name** - Change the term HP for this actor.
  * **TP Abbr** - Change the term HP (abbr.) for this actor.

**Class Config** - You said that these were just like real HP.  That means that my characters can gain Health HP as they level up, right?  Yep, of course they can.
* **Description** - Description so you know what this entry is. Recommended but not required.
* **Class Id** - The class these properties apply to.
* **Level Up** - Configure how Health HP increases on level up.
  * **Health Abbr** - The Health abbreviation.  You know the drill by now.
  * **Starting Max HP** - Use this to overwrite the default Max HP. Leave at 0 to use the default as defined in Health Config.
  * **Lower Level Gain** - Each level, an actor with this class will gain at least this amount of additional Health HP.
  * **Upper Level Gain** - Each level, an actor with this class will gain no more than this amount of additional Health HP.

**Use Health Battle Status** - The actor battle status window has been reimagined to display all of your Health HP gauges.  If you don’t want to use this, set this to false.

**Use Custom Actor Terms** - Custom Actor Terms for HP, MP and TP require overwriting core code so this option must be explicitly enabled to use.  Overwriting core code can cause incompatibilities with other plugins so I’m giving you way to shut this off if you need to.

**Add to Formulas** - If you want to use any of the actor’s Health HP in a formula, turn this option on.  If not, you can leave it off.

**Save Health Object** - Setting this to true allows you to modify the $dataHealth object, which contains all of the information within the plugin parameters, when the player saves the game.  By default, this object is built from the plugin parameters when a new game is started or a saved game is loaded.  This is usually what you’ll want.  If, for some reason, you need to alter this data in-game and have those changes persist until the end of the game, you’ll need to turn this option on.

**Limit Party Size** - Health effects will only be applied to the first X members of the party.  This option is mainly used for games that only want the lead actor to have to manage their health while other actors are temporary characters that are assumed to be managing their own health.  It can also be used if you have reserve actors and you don’t want their health levels falling.


## Style

**Show Max Health** - The default Status screen now shows the different levels of health alongside the actor’s attributes and equipment.  The Health HP is shown as Current HP/Max HP.  If you only want to show the current HP, turn this off.

**Color Config** - The default Status screen’s attributes and Health HP now display with color gauges.  You can configure those gauges here.
* **Attributes** - Colors for Attribute gauges.
  * **Min Percent** - Minimum percentage for this color.
  * **Max Percent** - Maximum percentage for this color.
  * **Start Color** - Hex color that this type of gauge starts with on the left.
  * **End Color** - Hex color that this type of gauge ends with on the right.
* **Decremental** - Define the colors for Decremental Health gauges.
* **Equilibrium** - Define the colors for Equilibrium Health gauges.
* **Incremental** - Define the colors for Incremental Health gauges.

![status](/img/snap03.png)

**Battle Config** - Health HP has been integrated with the battle system.  Because actors and enemies can now have many different HPs to take into consideration, I implemented visual gauges to more easily present this information to your players.
* **Use Enemy HP Gauge** - Enable or disable Health HP Gauges in battle.
* **Use Damage Popup** - Normally, HP damage pops up when damage is done.  If you are using the visual gauges, you probably want to suppress the default behavior.  But if you still want the normal HP damage numbers to popup, you can turn this on.
* **Enemy Gauge Width** - Set the width of enemies visual Health gauges.
* **Battle Status Config** - If you’ve enabled Use Health Battle Status then the default actor battle status window will replaced with one more suitable.  This is where you can configure how this looks.  Every game is different and there’s no telling how many Health attributes you are using in your game and which ones are relevant in battle.
  * **Actor Face Height** - Height in pixels for the actor’s face image.
  * **Gauge Rows** - Number of rows for Health gauges.
  * **Gauge Cols** - Number of columns for Health gauges.
  * **Name Left Padding** - Adjust the padding on the left for the HP text.
  * **Value Right Padding** - Adjust the padding on the right for the HP value.
  * **Top Padding** - Adjust the padding on the top if you need to push the text down some.
  * **Font Size** - Font size for battle gauge text.
  * **Gauges** - Configure the gauges in the default Battle Status Window.  They will appear in the order that they are listed.
  * **Health Abbr** - The Health abbreviation.
  * **Columns** - Number of columns that this Health gauge takes up.
  * **Show Name** - Show the health abbreviation on the battle gauge.
  * **Show Value** - Show the health value on the battle gauge.

![status](/img/snap02.png)

**Status Window** - The default RPG Maker MV status window can be configured to show the Health information.
* **Display Race** - Nickname is replaced with Race if FROG Race is installed.
* **Column 1** - Choose what is displayed in the first column.
  * **Attributes** - Display the actor’s attributes like Attack, Defense etc.
  * **Equipment** - Display the actor’s equipment.
  * **Health Stats** - Display the actor’s Health stats.
* **Health Stats 1** - If Health Stats chosen, list them in display order.
* **Column 2** - Choose what is displayed in the second column.
* **Health Stats 2** - If Health Stats chosen, list them in display order.
* **Column 3** - Choose what is displayed in the third column.
* **Health Stats 3** - If Health Stats chosen, list them in display order.

**Text Manager** - Configure how some of the text is displayed, mostly related to the battle log.
* **Actor Health Damage** - Sets the text format for Actor Health Damage. 1 = Actor Name, 2 = Damage, 3 = Damage Type.
* **Actor Health Drain** - Sets the text format for Actor Health Damage. 1 = Actor Name, 2 = Drain, 3 = Damage Type.
* **Actor Health Recovery** - Sets the text format for Actor Health Drain. 1 = Actor Name, 2 = Recovery, 3 = Damage Type.
* **Enemy Health Damage** - Sets the text format for Enemy Health Recovery. 1 = Actor Name, 2 = Damage, 3 = Damage Type.
* **Enemy Health Drain** - Sets the text format for Enemy Health Drain. 1 = Actor Name, 2 = Drain, 3 = Damage Type.
* **Enemy Health Recovery** - Sets the text format for Enemy Health Recovery. 1 = Actor Name, 2 = Recovery, 3 = Damage Type.


## Plugin Commands

These commands will give you more control over your character’s health scores.
Any [value] parameter can take a number such as 20 or a percentage like 20%.

Get the current health or max health value for this aspect
```javascript
HEALTH GETHP [actorId] [abbreviation] [variableId]
HEALTH GETMHP [actorId] [abbreviation] [variableId]
```

Set the exact value for a specific aspect of health
```javascript
HEALTH SETHP [actorId] [abbreviation] [value]
```

Adds to the value for a specific aspect of health
```javascript
HEALTH ADDHP [actorId] [abbreviation] [value]
```

Subtracts from the value for a specific aspect of health
```javascript
HEALTH REMHP [actorId] [abbreviation] [value]
```

Sets health of all party members
```javascript
HEALTH SETHPALL [abbreviation] [value]
```

Adds health to all party members
```javascript
HEALTH ADDHPALL [abbreviation] [value]
```

Subtracts health to all party members
```javascript
HEALTH REMHPALL [abbreviation] [value]
```

Test to see if a Condition is active
```javascript
HEALTH ISCONDACTIVE [condition name] [switch]
```

Sets a Condition as active
```javascript
HEALTH SETCOND [condition name]
```

Removes an active Condition
```javascript
HEALTH REMCOND [condition name]
```


## Terms of Use

This plugin can be used in commercial or non-commercial projects.  You also have my permission to write and share plugins that add to or extend the functionality of this plugin.  While not required, if you use this in a commercial game, a free copy of the game would be nice as I put a lot of work into this and would love to see how you used it in your game.

Credit Frogboy in your work.


## Changelog

* Version 0.9 - Beta release
