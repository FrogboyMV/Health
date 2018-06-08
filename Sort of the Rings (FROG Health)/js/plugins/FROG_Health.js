//=============================================================================
// Frogboy RMMV Plugin
// FROG_Health.js
//=============================================================================

var Imported = Imported || {};
Imported.FROG_Health = true;

var FROG = FROG || {};
FROG.Health = FROG.Health || {};
if (!Imported.FROG_Core) console.error("This plugin requires FROG_Core");

/*:
 * @plugindesc FROG_Health v0.9.3 Extended Health system for more fine-grained detail.
 * @author Frogboy
 *
 * @help
 * A Health system to track various levels of health beyond physical damage.
 * Author Frogboy
 *
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * RPG Maker MV gives you a lot of fine-grained control over your game, but
 * it’s primarily geared towards the creation of the JRPGs.  This means that
 * certain aspects of some of the classic WRPGs that I grew up with, like
 * Ultima and Dungeons & Dragons, aren’t supported by default.  Well, I’d like
 * to fix that!
 *
 * Adventuring is dangerous business.  Imagine your party climbing the tallest
 * mountain in the world.  The icy wind howls as you all attempt to stave off
 * the cold.  Nights are treacherous and not just because monsters are about.
 * The temperature drops to an unmanageable degree.  You must find shelter and
 * build a fire in order to avoid freezing to death.  You packed as much food
 * and water as you could but reaching the top of the mountain is taking a lot
 * longer than anyone expected.  The monsters roaming this rarely travelled
 * location are fierce and relentless.  Exhaustion is setting in as sleep is
 * hard to come by.  Will you live to reach the peak?  Will you have enough
 * strength left to fight the White Dragon who lives at the top and guards an
 * ancient artifact that you desperately need to fulfill your quest?
 *
 * One element that used to be very common in classic WRPGs is extra parameters
 * for health beyond the physical which is typically designated as HP or Life.
 * These extra parameters are typically things that a real, living human being,
 * or whatever race they may be, couldn’t survive or function without: Food,
 * Water, Oxygen, Normal Body Temperature, their Mind/Psyche/Sanity and so on.
 * Some games even divided a character’s overall HP into different body parts
 * with varying side-effects attributed to low health in each.  A busted leg
 * would slow you down.  A mangled arm would make it impossible to carry a
 * shield.  A serious head wound might knock you out for while.
 *
 * That’s where FROG_Health comes into play, or at least it will when it’s
 * finished.  Support is limited to simple things like Hunger, Thirst and
 * Exhaustion but I have plans to add the rest and maybe more.  That’s where
 * you come in.  I’d like to know what you would use a plugin like this for so
 * that I make sure that it is supported.  Let me know and I’ll do my best to
 * add it.
 *
 * ============================================================================
 * How to Use
 * ============================================================================
 *
 * This plugin has a crap-ton of parameters so that you can configure this
 * system work however you need for your game.  Ready to get crunchy?
 *
 * Health Config - Add various aspects of health to your game.  This is the meat
 * and potatoes of this plugin.  This parameter allows you to add additional HP
 * stats to your game.  Maybe you want to make Food, Water and Rest.  A horror
 * game could utilize Sanity or Fear.  Maybe you want to have a system where
 * Head, Body, Arms and Legs each have their own HP bars.  It’s completely
 * customizable so whatever you want to do will probably work.
 *
 *     Name - The name of this aspect of health.
 *
 *     Description - General description about this aspect of health.
 *
 *     Abbreviation - The key that you’ll use to identify this aspect of health
 *     in script calls, plugin commands and even in formula boxes if you wish.
 *
 *     Max Health - Number representing this aspects full health value.
 *
 *     Control - Controls how the value is applied.
 *         Decremental - Health value decreases over time.
 *         Equilibrium - Health value rises or falls until it reaches the
 *         midpoint.
 *         Incremental - Health value increases over time.
 *
 *     Every X Steps - How often the Auto-Adjust value is applied based on
 *     steps taken.
 *
 *     Value - The health value will rise or fall by this based on the Control
 *     parameter.
 *
 *     State Management - Low health in different areas apply States to a
 *     character.  You can define how that works here by specifying the
 *     range of HP that the State will be automatically applied and the
 *     likelihood it will happen.  Imagine that you have a Rest health
 *     attribute.  If a character’s Rest falls below 40%, you could apply a
 *     Tired state which maybe reduces their hit accuracy a little.  At 15%,
 *     maybe you replace the Tired state with Exhausted which also lowers
 *     their Attack as well.  If it gets all the way down to 0, they could
 *     fall asleep.
 *
 *         Description - Label to let you know what this entry is doing.  Not
 *         required but recommended.
 *
 *         State Id - The State that is applied or removed depending whether the
 *         actor’s health score falls within the Min and Max HP.
 *
 *         Type - Indicates whether Min HP and Max HP represent exact values or
 *         percentage of max health HP.

 *             Explicit Value - Min and Max HP are used as exact values.  If Max
 *             HP is 30, the State will apply at exactly 30 HP even if the
 *             actor’s maximum Health HP is 200.
 *
 *             Percentage - This uses the percentage of an actor’s maximum
 *             Health HP.  If Max HP is set to 30 and their maximum Health
 *             HP is 200, the State will apply at 60 HP.
 *
 *         Min HP - The minimum Health HP that this State will be applied.
 *
 *         Max HP - The maximum Health HP that this State will be applied.
 *
 *         Add Percentage - Odds per step that this State will be applied to any
 *         actor that falls within the min/max range.
 *
 *         Remove Percentage - Odds per step that this State will be removed for
 *         any actor that falls outside of the min/max range.
 *
 *         Adjustments - Different actors, classes, races, states, equipment and
 *         items can affect how State Management functions.  A Sea Elf may be
 *         able to hold their breath three times as long as a human underwater.
 *         Flame Armor can help you withstand extreme heat.  Paladins have
 *         extraordinary willpower.  All of these work mostly the same.  They
 *         just apply to different aspects of the game.
 *
 *             Description - Description so you know what this entry is.
 *             Recommended but not required.
 *
 *             Id - The actor, class, race, state, item, weapon or armor that
 *             adjusts the default health State Management values.
 *
 *             Value - The default Value will be adjusted by this amount.
 *
 *             Steps - The default Every X Steps will be adjusted by this
 *             amount.
 *
 *             Add Percentage - The default Add Percentage will be adjusted by
 *             this percent.  This value is multiplied by the State Management’s
 *
 *             Add Percentage as well as all other adjustments.  100% means that
 *             it stays the same.  50% mean that it cuts it in half and 200%
 *             would double the odds.  This works like applying multiple
 *             Elemental Chance traits.
 *
 *             Remove Percentage - Works just like Add Percent but applies to
 *             the Remove Percentage chance.
 *
 *             Visible - Actors, class and races can be configured to hide this
 *             Health HP attribute so that this character doesn’t appear to have
 *             it at all.  Make sure you set Immune to false if if you want to
 *             completely eliminate this Health attribute for this character.
 *
 *             Enemy Parameters - If your actors have to deal with various
 *             levels of Health, their foes should need to as well.  Enemies
 *             don’t typically persist beyond battle so this parameter just
 *             allows you to set the default Min and Max percentage range for
 *             all enemies.  If this is not set, the range will default to the
 *             optimum 50% range according to the gauges Control.  A Decremental
 *             gauge will be 50%-100%; an Incremental will be 0%-50%; and
 *             Equilibrium defaults to 25%-75%. These defaults can be overridden
 *             here.
 *
 *                 Min Percent -  Minimum percentage of Health HP enemies start
 *                 battle with.
 *
 *                 Max Percent -  Maximum percentage of Health HP enemies start
 *                 battle with.
 *
 *         Show in Battle Log - Show or hide damage to this Health in the
 *         Battle Log.
 *
 *         Recover All - Health HP recovers to optimum value when Recover All
 *         command is executed.
 *
 *         Battle Gauge Color - Customize the battle gauge color.
 *
 *         Drain Health Abbr - Normally, when a Health HP bar runs out, that’s
 *         it.  Most of the time, something really bad happens like they die,
 *         fall asleep, go insane or whatever.  But maybe you don’t want it to
 *         be so drastic.  Maybe running out food or water doesn’t kill you but
 *         starts draining your normal HP.  In systems where normal HP is split
 *         into different Health HP stats like (Head, Body, Arms and Legs), you
 *         probably want negative health in those areas to start damaging the
 *         character’s normal HP.  By specifying an abbreviation, when this
 *         Health is at critical levels as defined by the Control parameter,
 *         excess is applied to the other Health stat.  You can also use HP or
 *         MP here.
 *
 * Basic State Management - Wouldn’t it be nice if have low HP, MP or TP could
 * also apply States like Health HP does?  Wouldn’t it be nice we even went a
 * step farther and granted a nice little bonus when these attributes are nearly
 * full?  Of course it would so that why you can now extend this kind of
 * functionality to your normal HP stats.
 *
 *     HP State Management - Configured just like State Management but for
 *     normal HP.
 *
 *     MP State Management - Configured just like State Management but for MP.
 *
 *     TP State Management - Configured just like State Management but for TP.
 *     Not sure how useful this one is but it’s here anyway.
 *
 * Conditions - Add conditions that alter the way specific Health aspects
 * function for all party members.  Many different environments can change the
 * way Health HP work.  Going underwater will deplete your Oxygen.  An icy
 * tundra could freeze an unprepared adventurer to death.  Travelling through a
 * desert can give you heat stroke and drain your Water HP quicker.  A stale
 * bog might have a chance to infect you with a rare disease.  No longer can
 * your adventurers brave harsh conditions without feeling it’s effects.  Some
 * Conditions may not affect Health at all but are just used to turn day into
 * night or make ranged attacks less effective if it happens to be especially
 * windy outside.
 *
 *     Name - Name of the Condition.
 *
 *     Description - Description of the Condition.
 *
 *     Icon Id - In the top right-hand corner of the default Status Window, this
 *     icon will show when this Condition is active.
 *
 *     Adjust Health - Conditions change the way Health HP normally functions.
 *     Some Health aspects, like Food and Water, naturally deplete over time.
 *     Others, like Oxygen, are naturally available.  Conditions change this.
 *     Getting sealed in an airtight room will deprive you of Oxygen.  Cold
 *     weather will lower your Body Temperature.  You could even have it so that
 *     just hanging out at the tavern raise your Water HP.
 *
 *         Health Abbr - Abbreviation for the aspect of Health that is affected.
 *
 *         Control - Resets the ways that the gauge operates.  Normally, Oxygen
 *         would increment over time and usually be maxed out but if the party
 *         went underwater, their Oxygen would start decreasing instead.
 *
 *         Adjust Value - Adds to the default Health Value.
 *
 *         Adjust Steps - Adds to the default Every X Steps.
 *
 *         Immune - Disables Health adjustments when true.
 *
 *     Set Common Event - Common Event that will run when this Condition becomes
 *     active.  Say you have a Night condition.  You could tint the screen dark.
 *     A Cold condition may have a chance to make it start snowing.  Perhaps you
 *     need remove other conditions when this one becomes active.
 *
 *     Remove Common Event - Same as the Add version but triggers when this
 *     Condition is removed.
 *
 *     Immune - Actors, classes, races, items, equipment and states that make
 *     one immune to this condition are defined here.
 *
 * Formula Config - By now, you might be wondering how these Health attributes
 * work in battle.  For the most part, they work just like normal HP.  This
 * changes some dynamics, though.  If you have Rest HP, why have a Sleep spell
 * that succeeds or fails based on random chance?  You could make Sleep do Rest
 * damage now.  Charm and Fascination could attack the mind.  You could even
 * have a suffocation spell suck the air out your enemy’s lungs (assuming they
 * have lungs).  Your Skill list is about to get a lot more interesting.
 *
 *     Name - The name of this formula.  The editor doesn’t have any way to
 *     handle a Skill that does damage to HP, Food and Water.  So to make this
 *     possible, you can now enter the name of a formula here and place that
 *     name within quotes in the formula box of a Skill or Item.  If you enter
 *     ‘quake’ or “quake” into the formula box (with the quotes), the Skill or
 *     Item will reference the formula with the name quake.
 *
 *     Damage - Define however many damage formulas you need and which aspects
 *     of Health are affected.  Use hp, mp or tp if you want to affect these
 *     attributes.
 *
 *         Health Abbr - The Health abbreviation this formula applies to.
 *
 *         Formula - Enter the formula just as you would in the normal formula
 *         box except now you get a nice big, multi-line note box.  How freakin’
 *         sweet is that?
 *
 *         Show Damage - Damage is shown in battle log and visibly affects the
 *         target.  Sometimes, you may not want to show every different type of
 *         damage during an attack.  Maybe getting hit with an attack wakes you
 *         up a little and adds a small amount to your Rest HP.  For something
 *         minor like this, you probably don’t need to display this information.
 *         Turn this off in those situations.
 *
 *         Flip Damage - If the damage type is set to HP Damage, it flips to HP
 *         Recovery for this Health attribute.  HP Recovery becomes HP Damage.
 *         Sometimes you may need to damage some health while recovering one or
 *         more others (or vise versa).
 *
 *         Min 1 Damage - This formula will always do at least 1 damage.
 *
 *     Register as Damage - This Skill counts as a hit and will activate a
 *     State's Remove by Damage property.  A Sleep skill that wakes up its
 *     target isn’t of much use so you should turn this off in situations like
 *     this.
 *
 * Actor Config - Configure actor specific properties.
 *
 *     Description - Description so you know what this entry is. Recommended but
 *     not required.
 *
 *     Actor Id - The actor these properties apply to.
 *
 *     Custom Terms - Change the names for HP, MP and/or TP for this actor.
 *     Sometimes, these terms just don’t fit for everyone, especially MP.
 *         HP Name - Change the term HP for this actor.
 *         HP Abbr - Change the term HP (abbr.) for this actor.
 *         MP Name - Change the term HP for this actor.
 *         MP Abbr - Change the term HP (abbr.) for this actor.
 *         TP Name - Change the term HP for this actor.
 *         TP Abbr - Change the term HP (abbr.) for this actor.
 *
 * Class Config - You said that these were just like real HP.  That means that
 * my characters can gain Health HP as they level up, right?  Yep, of course
 * they can.
 *
 *     Description - Description so you know what this entry is. Recommended
 *     but not required.
 *
 *     Class Id - The class these properties apply to.
 *
 *     Custom Terms - Change the names for HP, MP and/or TP for this actor.
 *     Sometimes, these terms just don’t fit for everyone, especially MP.
 *         HP Name - Change the term HP for this actor.
 *         HP Abbr - Change the term HP (abbr.) for this actor.
 *         MP Name - Change the term HP for this actor.
 *         MP Abbr - Change the term HP (abbr.) for this actor.
 *         TP Name - Change the term HP for this actor.
 *         TP Abbr - Change the term HP (abbr.) for this actor.
 *
 *     Level Up - Configure how Health HP increases on level up.
 *
 *     Health Abbr - The Health abbreviation.  You know the drill by now.
 *
 *     Starting Max HP - Use this to overwrite the default Max HP. Leave at 0
 *     to use the default as defined in Health Config.
 *
 *     Lower Level Gain - Each level, an actor with this class will gain at
 *     least this amount of additional Health HP.
 *
 *     Upper Level Gain - Each level, an actor with this class will gain no more
 *     than this amount of additional Health HP.
 *
 * Use Health Battle Status - The actor battle status window has been reimagined
 * to display all of your Health HP gauges.  If you don’t want to use this, set
 * this to false.
 *
 * Use Custom Terms - Custom Actor Terms for HP, MP and TP require
 * overwriting core code so this option must be explicitly enabled to use.
 * Overwriting core code can cause incompatibilities with other plugins so I’m
 * giving you way to shut this off if you need to.
 *
 * Add to Formulas - If you want to use any of the actor’s Health HP in a
 * formula, turn this option on.  If not, you can leave it off.
 *
 * Save Health Object - Setting this to true allows you to modify the
 * $dataHealth object, which contains all of the information within the plugin
 * parameters, when the player saves the game.  By default, this object is built
 * from the plugin parameters when a new game is started or a saved game is
 * loaded.  This is usually what you’ll want.  If, for some reason, you need to
 * alter this data in-game and have those changes persist until the end of the
 * game, you’ll need to turn this option on.
 *
 * Limit Party Size - Health effects will only be applied to the first X members
 * of the party.  This option is mainly used for games that only want the lead
 * actor to have to manage their health while other actors are temporary
 * characters that are assumed to be managing their own health.  It can also be
 * used if you have reserve actors and you don’t want their health levels
 * falling.
 *
 *
 * Style
 *
 * Show Max Health - The default Status screen now shows the different levels of
 * health alongside the actor’s attributes and equipment.  The Health HP is
 * shown as Current HP/Max HP.  If you only want to show the current HP, turn
 * this off.
 *
 * Color Config - The default Status screen’s attributes and Health HP now
 * display with color gauges.  You can configure those gauges here.
 *
 *     Attributes - Colors for Attribute gauges.
 *         Min Percent - Minimum percentage for this color.
 *         Max Percent - Maximum percentage for this color.
 *         Start Color - Hex color that this type of gauge starts with on the
 *         left.
 *         End Color - Hex color that this type of gauge ends with on the right.
 *     Decremental - Define the colors for Decremental Health gauges.
 *     Equilibrium - Define the colors for Equilibrium Health gauges.
 *     Incremental - Define the colors for Incremental Health gauges.
 *
 * Battle Config - Health HP has been integrated with the battle system.
 * Because actors and enemies can now have many different HPs to take into
 * consideration, I implemented visual gauges to more easily present this
 * information to your players.
 *
 *     Use Enemy HP Gauge - Enable or disable Health HP Gauges in battle.
 *
 *     Use Damage Popup - Normally, HP damage pops up when damage is done.  If
 *     you are using the visual gauges, you probably want to suppress the
 *     default behavior.  But if you still want the normal HP damage numbers to
 *     popup, you can turn this on.
 *
 *     Enemy Gauge Width - Set the width of enemies visual Health gauges.
 *
 *     Enemy Gauge List - Global list of enemy gauges to display during battle.
 *     Any abbreviations left off this list won't show in battle and enemies
 *     will be immune to damage of this type. You can remove Health HP from
 *     every enemy by not listing it here.
 *
 *     Battle Status Config - If you’ve enabled Use Health Battle Status then
 *     the default actor battle status window will replaced with one more
 *     suitable.  This is where you can configure how this looks.  Every game is
 *     different and there’s no telling how many Health attributes you are using
 *     in your game and which ones are relevant in battle.
 *
 *         Actor Face Height - Height in pixels for the actor’s face image.
 *
 *         Gauge Rows - Number of rows for Health gauges.
 *
 *         Gauge Cols - Number of columns for Health gauges.
 *
 *         Name Left Padding - Adjust the padding on the left for the HP text.
 *
 *         Value Right Padding - Adjust the padding on the right for the HP
 *         value.
 *
 *         Top Padding - Adjust the padding on the top if you need to push the
 *         text down some.
 *
 *         Font Size - Font size for battle gauge text.
 *
 *         Gauges - Configure the gauges in the default Battle Status Window.
 *         They will appear in the order that they are listed.
 *
 *             Health Abbr - The Health abbreviation.
 *
 *             Columns - Number of columns that this Health gauge takes up.
 *
 *             Show Name - Show the health abbreviation on the battle gauge.
 *
 *             Show Value - Show the health value on the battle gauge.
 *
 * Status Window - The default RPG Maker MV status window can be configured to
 * show the Health information.
 *
 *     Display Race - Nickname is replaced with Race if FROG Race is installed.
 *
 *     Column 1 - Choose what is displayed in the first column.
 *         Attributes - Display the actor’s attributes like Attack, Defense etc.
 *         Equipment - Display the actor’s equipment.
 *         Health Stats - Display the actor’s Health stats.
 *
 *     Health Stats 1 - If Health Stats chosen, list them in display order.
 *
 *     Column 2 - Choose what is displayed in the second column.
 *
 *     Health Stats 2 - If Health Stats chosen, list them in display order.
 *
 *     Column 3 - Choose what is displayed in the third column.
 *
 *     Health Stats 3 - If Health Stats chosen, list them in display order.
 *
 * Text Manager - Configure how some of the text is displayed, mostly related
 * to the battle log.
 *
 *     Actor Health Damage - Sets the text format for Actor Health Damage.
 *     1 = Actor Name, 2 = Damage, 3 = Damage Type.
 *
 *     Actor Health Drain - Sets the text format for Actor Health Damage.
 *     1 = Actor Name, 2 = Drain, 3 = Damage Type.
 *
 *     Actor Health Recovery - Sets the text format for Actor Health Drain.
 *     1 = Actor Name, 2 = Recovery, 3 = Damage Type.
 *
 *     Enemy Health Damage - Sets the text format for Enemy Health Recovery.
 *     1 = Actor Name, 2 = Damage, 3 = Damage Type.
 *
 *     Enemy Health Drain - Sets the text format for Enemy Health Drain.
 *     1 = Actor Name, 2 = Drain, 3 = Damage Type.
 *
 *     Enemy Health Recovery - Sets the text format for Enemy Health Recovery.
 *     1 = Actor Name, 2 = Recovery, 3 = Damage Type.
 *
 *
 * Plugin Commands
 *
 * These commands will give you more control over your character’s health scores.
 * Any [value] parameter can take a number such as 20 or a percentage like 20%.
 *
 * Get the current health or max health value for this aspect
 * HEALTH GETHP [actorId] [abbreviation] [variableId]
 * HEALTH GETMHP [actorId] [abbreviation] [variableId]
 *
 * Set the exact value for a specific aspect of health
 * HEALTH SETHP [actorId] [abbreviation] [value]
 *
 * Adds to the value for a specific aspect of health
 * HEALTH ADDHP [actorId] [abbreviation] [value]
 *
 * Subtracts from the value for a specific aspect of health
 * HEALTH REMHP [actorId] [abbreviation] [value]
 *
 * Sets health of all party members
 * HEALTH SETHPALL [abbreviation] [value]
 *
 * Adds health to all party members
 * HEALTH ADDHPALL [abbreviation] [value]
 *
 * Subtracts health to all party members
 * HEALTH REMHPALL [abbreviation] [value]
 *
 * Test to see if a Condition is active
 * HEALTH ISCONDACTIVE [condition name] [switch]
 *
 * Sets a Condition as active
 * HEALTH SETCOND [condition name]
 *
 * Removes an active Condition
 * HEALTH REMCOND [condition name]
 *
 *
 * ============================================================================
 * Terms of Use
 * ============================================================================
 *
 * This plugin can be used in commercial or non-commercial projects.  If you
 * are a plugin developer, feel free to write add-ons for this if you want
 * to extend its functionality.  While not required, if you use this in a
 * commercial game, a free copy of the game would be nice as I put a lot of
 * work into this and would love to see how you used it in your game.
 *
 * Credit Frogboy in your work.
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 0.9 - Beta
 * Version 0.9.01 - Bug fixes
 *     Fixed crash when adjustments property is deleted.
 *     Fixed bug where enemy gauges don't disappear.
 * Version 0.9.02 - Bug Fix
 *     Crashed when battle status gauge was misconfigured.
 * Version 0.9.3 - Bug Fixes
 *     Removed upper and lower range for Conditions. Too many issues with this.
 *     Added a way to make all enemies immune to individual Health HP.
 *     Added alert messages for when actors gain States due to Health levels.
 *     Bug that made Items unusable.
 *     Added Custom HP, MP, TP terms by class and enemies.
 *
 * ============================================================================
 *
 * @param Settings
 * @desc Set up how the Health system will work in your game.
 * @param Style
 * @desc Customize how thing look.
 *
 * @param Health Config
 * @parent Settings
 * @type struct<healthStruct>[]
 * @desc Add various aspects of health to your game.
 * @default ["{\"Name\":\"Food\",\"Description\":\"\\\"Your current level of sustenance.  You will need to eat\\\\nfood in order to keep your health up.\\\"\",\"Abbreviation\":\"food\",\"Max Health\":\"100\",\"Control\":\"decremental\",\"Starts At\":\"FULL\",\"Value\":\"1\",\"Every X Steps\":\"100\",\"State Management\":\"[\\\"{\\\\\\\"Description\\\\\\\":\\\\\\\"Dead 0%\\\\\\\",\\\\\\\"State Id\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"Min HP\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Max HP\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Apply Percentage\\\\\\\":\\\\\\\"100\\\\\\\",\\\\\\\"Set Common Event\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Remove Common Event\\\\\\\":\\\\\\\"0\\\\\\\"}\\\"]\",\"Adjustments\":\"{\\\"Actor\\\":\\\"[]\\\",\\\"Class\\\":\\\"[]\\\",\\\"Race\\\":\\\"[]\\\",\\\"Item\\\":\\\"[]\\\",\\\"Weapon\\\":\\\"[]\\\",\\\"Armor\\\":\\\"[]\\\",\\\"State\\\":\\\"[]\\\",\\\"Enemy\\\":\\\"[\\\\\\\"{\\\\\\\\\\\\\\\"Description\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"Enemy Id\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"2\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"Add Percentage\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"100\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"Remove Percentage\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"100\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"Bonus/Penalty\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"Immune\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"true\\\\\\\\\\\\\\\"}\\\\\\\"]\\\"}\",\"Enemy Parameters\":\"{\\\"Min Percent\\\":\\\"\\\",\\\"Max Percent\\\":\\\"\\\"}\",\"Show In Battle Log\":\"true\",\"Recover All\":\"true\",\"Battle Gauge Color\":\"{\\\"Start Color\\\":\\\"#30A030\\\",\\\"End Color\\\":\\\"#50D050\\\"}\",\"Drain Health Abbr\":\"\"}","{\"Name\":\"Water\",\"Description\":\"\\\"Your current level of hydration.  You will need to drink\\\\nwater or the like in order to keep your health up.\\\"\",\"Abbreviation\":\"water\",\"Max Health\":\"100\",\"Control\":\"decremental\",\"Starts At\":\"FULL\",\"Value\":\"1\",\"Every X Steps\":\"50\",\"State Management\":\"[\\\"{\\\\\\\"Description\\\\\\\":\\\\\\\"Dead 0%\\\\\\\",\\\\\\\"State Id\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"Min HP\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Max HP\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Apply Percentage\\\\\\\":\\\\\\\"100\\\\\\\",\\\\\\\"Set Common Event\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Remove Common Event\\\\\\\":\\\\\\\"0\\\\\\\"}\\\"]\",\"Adjustments\":\"{\\\"Actor\\\":\\\"[]\\\",\\\"Class\\\":\\\"[]\\\",\\\"Race\\\":\\\"[]\\\",\\\"Item\\\":\\\"[]\\\",\\\"Weapon\\\":\\\"[]\\\",\\\"Armor\\\":\\\"[]\\\",\\\"State\\\":\\\"[]\\\",\\\"Enemy\\\":\\\"[\\\\\\\"{\\\\\\\\\\\\\\\"Description\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"Enemy Id\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"2\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"Add Percentage\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"100\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"Remove Percentage\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"100\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"Bonus/Penalty\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"Immune\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"true\\\\\\\\\\\\\\\"}\\\\\\\"]\\\"}\",\"Enemy Parameters\":\"{\\\"Min Percent\\\":\\\"\\\",\\\"Max Percent\\\":\\\"\\\"}\",\"Show In Battle Log\":\"true\",\"Recover All\":\"true\",\"Battle Gauge Color\":\"{\\\"Start Color\\\":\\\"#000080\\\",\\\"End Color\\\":\\\"#3030B0\\\"}\",\"Drain Health Abbr\":\"\"}","{\"Name\":\"Rest\",\"Description\":\"\\\"Your current level of exhaustion.  You will need to rest\\\\nin order to keep this aspect of your health up.\\\"\",\"Abbreviation\":\"rest\",\"Max Health\":\"100\",\"Control\":\"decremental\",\"Starts At\":\"FULL\",\"Value\":\"1\",\"Every X Steps\":\"50\",\"State Management\":\"[\\\"{\\\\\\\"Description\\\\\\\":\\\\\\\"Sleep 0%\\\\\\\",\\\\\\\"State Id\\\\\\\":\\\\\\\"10\\\\\\\",\\\\\\\"Type\\\\\\\":\\\\\\\"VALUE\\\\\\\",\\\\\\\"Min HP\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Max HP\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Add Percentage\\\\\\\":\\\\\\\"100\\\\\\\",\\\\\\\"Remove Percentage\\\\\\\":\\\\\\\"100\\\\\\\"}\\\",\\\"{\\\\\\\"Description\\\\\\\":\\\\\\\"Confusion 1%-10%\\\\\\\",\\\\\\\"State Id\\\\\\\":\\\\\\\"8\\\\\\\",\\\\\\\"Type\\\\\\\":\\\\\\\"VALUE\\\\\\\",\\\\\\\"Min HP\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Max HP\\\\\\\":\\\\\\\"15\\\\\\\",\\\\\\\"Add Percentage\\\\\\\":\\\\\\\"2\\\\\\\",\\\\\\\"Remove Percentage\\\\\\\":\\\\\\\"100\\\\\\\"}\\\"]\",\"Adjustments\":\"{\\\"Actor\\\":\\\"[]\\\",\\\"Class\\\":\\\"[]\\\",\\\"Race\\\":\\\"[]\\\",\\\"Item\\\":\\\"[]\\\",\\\"Weapon\\\":\\\"[]\\\",\\\"Armor\\\":\\\"[]\\\",\\\"State\\\":\\\"[]\\\",\\\"Enemy\\\":\\\"[\\\\\\\"{\\\\\\\\\\\\\\\"Description\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"Enemy Id\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"2\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"Add Percentage\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"100\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"Remove Percentage\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"100\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"Bonus/Penalty\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"Immune\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"true\\\\\\\\\\\\\\\"}\\\\\\\"]\\\"}\",\"Enemy Parameters\":\"{\\\"Min Percent\\\":\\\"\\\",\\\"Max Percent\\\":\\\"\\\"}\",\"Show In Battle Log\":\"true\",\"Recover All\":\"true\",\"Battle Gauge Color\":\"{\\\"Start Color\\\":\\\"#800070\\\",\\\"End Color\\\":\\\"#A80090\\\"}\",\"Drain Health Abbr\":\"\"}","{\"Name\":\"Oxygen\",\"Description\":\"\\\"Your current level of breathable air.  This value will fall\\\\nif you are under water or in some environment without air.\\\"\",\"Abbreviation\":\"oxygen\",\"Max Health\":\"100\",\"Control\":\"incremental\",\"Starts At\":\"FULL\",\"Value\":\"1\",\"Every X Steps\":\"1\",\"State Management\":\"[\\\"{\\\\\\\"Description\\\\\\\":\\\\\\\"Dead 0%\\\\\\\",\\\\\\\"State Id\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"Type\\\\\\\":\\\\\\\"VALUE\\\\\\\",\\\\\\\"Min HP\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Max HP\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Add Percentage\\\\\\\":\\\\\\\"100\\\\\\\",\\\\\\\"Remove Percentage\\\\\\\":\\\\\\\"100\\\\\\\"}\\\"]\",\"Adjustments\":\"{\\\"Actor\\\":\\\"[]\\\",\\\"Class\\\":\\\"[]\\\",\\\"Race\\\":\\\"[]\\\",\\\"Item\\\":\\\"[]\\\",\\\"Weapon\\\":\\\"[]\\\",\\\"Armor\\\":\\\"[]\\\",\\\"State\\\":\\\"[]\\\",\\\"Enemy\\\":\\\"[\\\\\\\"{\\\\\\\\\\\\\\\"Description\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"Enemy Id\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"2\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"Add Percentage\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"100\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"Remove Percentage\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"100\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"Bonus/Penalty\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"Immune\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"true\\\\\\\\\\\\\\\"}\\\\\\\"]\\\"}\",\"Enemy Parameters\":\"{\\\"Min Percent\\\":\\\"80\\\",\\\"Max Percent\\\":\\\"100\\\"}\",\"Show In Battle Log\":\"true\",\"Recover All\":\"true\",\"Battle Gauge Color\":\"{\\\"Start Color\\\":\\\"#4BCDB4\\\",\\\"End Color\\\":\\\"#5FFEE0\\\"}\",\"Drain Health Abbr\":\"\"}","{\"Name\":\"Psyche\",\"Description\":\"\\\"This value represents the health of your mind and its level\\\\nof sanity.\\\"\",\"Abbreviation\":\"psyche\",\"Max Health\":\"100\",\"Control\":\"incremental\",\"Starts At\":\"FULL\",\"Value\":\"0\",\"Every X Steps\":\"0\",\"State Management\":\"[\\\"{\\\\\\\"Description\\\\\\\":\\\\\\\"Fascination 0%\\\\\\\",\\\\\\\"State Id\\\\\\\":\\\\\\\"6\\\\\\\",\\\\\\\"Type\\\\\\\":\\\\\\\"VALUE\\\\\\\",\\\\\\\"Min HP\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Max HP\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Add Percentage\\\\\\\":\\\\\\\"100\\\\\\\",\\\\\\\"Remove Percentage\\\\\\\":\\\\\\\"100\\\\\\\"}\\\"]\",\"Adjustments\":\"{\\\"Actor\\\":\\\"[]\\\",\\\"Class\\\":\\\"[]\\\",\\\"Race\\\":\\\"[]\\\",\\\"Item\\\":\\\"[]\\\",\\\"Weapon\\\":\\\"[]\\\",\\\"Armor\\\":\\\"[]\\\",\\\"State\\\":\\\"[]\\\",\\\"Enemy\\\":\\\"[\\\\\\\"{\\\\\\\\\\\\\\\"Description\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"Enemy Id\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"2\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"Add Percentage\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"100\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"Remove Percentage\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"100\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"Bonus/Penalty\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"Immune\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"true\\\\\\\\\\\\\\\"}\\\\\\\"]\\\"}\",\"Enemy Parameters\":\"{\\\"Min Percent\\\":\\\"\\\",\\\"Max Percent\\\":\\\"\\\"}\",\"Show In Battle Log\":\"true\",\"Recover All\":\"false\",\"Battle Gauge Color\":\"{\\\"Start Color\\\":\\\"#B03030\\\",\\\"End Color\\\":\\\"#D06060\\\"}\",\"Drain Health Abbr\":\"\"}","{\"Name\":\"Body Temp\",\"Description\":\"\\\"Body Temperature\\\"\",\"Abbreviation\":\"temp\",\"Max Health\":\"200\",\"Control\":\"equilibrium\",\"Starts At\":\"HALF\",\"Value\":\"1\",\"Every X Steps\":\"15\",\"State Management\":\"[]\",\"Adjustments\":\"{\\\"Actor\\\":\\\"[]\\\",\\\"Class\\\":\\\"[]\\\",\\\"Race\\\":\\\"[]\\\",\\\"Item\\\":\\\"[]\\\",\\\"Weapon\\\":\\\"[]\\\",\\\"Armor\\\":\\\"[]\\\",\\\"State\\\":\\\"[]\\\",\\\"Enemy\\\":\\\"[]\\\"}\",\"Enemy Parameters\":\"{\\\"Min Percent\\\":\\\"\\\",\\\"Max Percent\\\":\\\"\\\"}\",\"Show In Battle Log\":\"true\",\"Recover All\":\"false\",\"Battle Gauge Color\":\"{\\\"Start Color\\\":\\\"#B08000\\\",\\\"End Color\\\":\\\"#D0A000\\\"}\",\"Drain Health Abbr\":\"\"}"]
 *
 * @param Basic State Management
 * @parent Settings
 * @type struct<basicManagementStruct>
 * @desc Apply states to actors when their HP, MP or TP reaches certain levels.
 * @default {"Hp State Management":"[]","Mp State Management":"[]","Tp State Management":"[]"}
 *
 * @param Conditions
 * @parent Settings
 * @type struct<conditionStruct>[]
 * @desc Add conditions that alter the way specific Health aspects function.
 * @default ["{\"Name\":\"Town\",\"Description\":\"\\\"Immune to most conditions when in town.\\\"\",\"Icon Id\":\"0\",\"Adjust Health\":\"[\\\"{\\\\\\\"Health Abbr\\\\\\\":\\\\\\\"food\\\\\\\",\\\\\\\"Control\\\\\\\":\\\\\\\"default\\\\\\\",\\\\\\\"Adjust Value\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Adjust Steps\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Lower Health Range\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Upper Health Range\\\\\\\":\\\\\\\"100\\\\\\\",\\\\\\\"Immune\\\\\\\":\\\\\\\"true\\\\\\\"}\\\",\\\"{\\\\\\\"Health Abbr\\\\\\\":\\\\\\\"water\\\\\\\",\\\\\\\"Control\\\\\\\":\\\\\\\"default\\\\\\\",\\\\\\\"Adjust Value\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Adjust Steps\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Lower Health Range\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Upper Health Range\\\\\\\":\\\\\\\"100\\\\\\\",\\\\\\\"Immune\\\\\\\":\\\\\\\"true\\\\\\\"}\\\",\\\"{\\\\\\\"Health Abbr\\\\\\\":\\\\\\\"rest\\\\\\\",\\\\\\\"Control\\\\\\\":\\\\\\\"default\\\\\\\",\\\\\\\"Adjust Value\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Adjust Steps\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Lower Health Range\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Upper Health Range\\\\\\\":\\\\\\\"100\\\\\\\",\\\\\\\"Immune\\\\\\\":\\\\\\\"true\\\\\\\"}\\\",\\\"{\\\\\\\"Health Abbr\\\\\\\":\\\\\\\"oxygen\\\\\\\",\\\\\\\"Control\\\\\\\":\\\\\\\"default\\\\\\\",\\\\\\\"Adjust Value\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Adjust Steps\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Lower Health Range\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Upper Health Range\\\\\\\":\\\\\\\"100\\\\\\\",\\\\\\\"Immune\\\\\\\":\\\\\\\"true\\\\\\\"}\\\",\\\"{\\\\\\\"Health Abbr\\\\\\\":\\\\\\\"temp\\\\\\\",\\\\\\\"Control\\\\\\\":\\\\\\\"default\\\\\\\",\\\\\\\"Adjust Value\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Adjust Steps\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Lower Health Range\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Upper Health Range\\\\\\\":\\\\\\\"100\\\\\\\",\\\\\\\"Immune\\\\\\\":\\\\\\\"true\\\\\\\"}\\\"]\",\"Set Common Event\":\"0\",\"Remove Common Event\":\"0\",\"Immune\":\"{\\\"Actor Id\\\":\\\"[]\\\",\\\"Class Id\\\":\\\"[]\\\",\\\"Race Id\\\":\\\"[]\\\",\\\"Item Id\\\":\\\"[]\\\",\\\"Weapon Id\\\":\\\"[]\\\",\\\"Armor Id\\\":\\\"[]\\\",\\\"State Id\\\":\\\"[]\\\"}\"}","{\"Name\":\"Heat\",\"Description\":\"\\\"Extreme Heat. Raises body temperature.\\\"\",\"Icon Id\":\"64\",\"Adjust Health\":\"[\\\"{\\\\\\\"Health Abbr\\\\\\\":\\\\\\\"temp\\\\\\\",\\\\\\\"Control\\\\\\\":\\\\\\\"incremental\\\\\\\",\\\\\\\"Adjust Value\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"Adjust Steps\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Lower Health Range\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Upper Health Range\\\\\\\":\\\\\\\"200\\\\\\\",\\\\\\\"Immune\\\\\\\":\\\\\\\"false\\\\\\\"}\\\",\\\"{\\\\\\\"Health Abbr\\\\\\\":\\\\\\\"water\\\\\\\",\\\\\\\"Control\\\\\\\":\\\\\\\"decremental\\\\\\\",\\\\\\\"Adjust Value\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Adjust Steps\\\\\\\":\\\\\\\"-10\\\\\\\",\\\\\\\"Lower Health Range\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Upper Health Range\\\\\\\":\\\\\\\"100\\\\\\\",\\\\\\\"Immune\\\\\\\":\\\\\\\"false\\\\\\\"}\\\"]\",\"Set Common Event\":\"0\",\"Remove Common Event\":\"0\",\"Immune\":\"{\\\"Actor Id\\\":\\\"[]\\\",\\\"Class Id\\\":\\\"[]\\\",\\\"Race Id\\\":\\\"[]\\\",\\\"Item Id\\\":\\\"[]\\\",\\\"Weapon Id\\\":\\\"[]\\\",\\\"Armor Id\\\":\\\"[]\\\",\\\"State Id\\\":\\\"[]\\\"}\"}","{\"Name\":\"Cold\",\"Description\":\"\\\"Extreme Cold. Lowers body temperature.\\\"\",\"Icon Id\":\"65\",\"Adjust Health\":\"[\\\"{\\\\\\\"Health Abbr\\\\\\\":\\\\\\\"temp\\\\\\\",\\\\\\\"Control\\\\\\\":\\\\\\\"decremental\\\\\\\",\\\\\\\"Adjust Value\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"Adjust Steps\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Lower Health Range\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Upper Health Range\\\\\\\":\\\\\\\"200\\\\\\\",\\\\\\\"Immune\\\\\\\":\\\\\\\"false\\\\\\\"}\\\"]\",\"Set Common Event\":\"0\",\"Remove Common Event\":\"0\",\"Immune\":\"{\\\"Actor Id\\\":\\\"[]\\\",\\\"Class Id\\\":\\\"[]\\\",\\\"Race Id\\\":\\\"[]\\\",\\\"Item Id\\\":\\\"[]\\\",\\\"Weapon Id\\\":\\\"[]\\\",\\\"Armor Id\\\":\\\"[]\\\",\\\"State Id\\\":\\\"[]\\\"}\"}","{\"Name\":\"Underwater\",\"Description\":\"\\\"Oxygen depletes as you hold your breath.\\\"\",\"Icon Id\":\"67\",\"Adjust Health\":\"[\\\"{\\\\\\\"Health Abbr\\\\\\\":\\\\\\\"oxygen\\\\\\\",\\\\\\\"Control\\\\\\\":\\\\\\\"decremental\\\\\\\",\\\\\\\"Adjust Value\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Adjust Steps\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Lower Health Range\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Upper Health Range\\\\\\\":\\\\\\\"100\\\\\\\",\\\\\\\"Immune\\\\\\\":\\\\\\\"false\\\\\\\"}\\\"]\",\"Set Common Event\":\"0\",\"Remove Common Event\":\"0\",\"Immune\":\"{\\\"Actor Id\\\":\\\"[]\\\",\\\"Class Id\\\":\\\"[]\\\",\\\"Race Id\\\":\\\"[]\\\",\\\"Item Id\\\":\\\"[]\\\",\\\"Weapon Id\\\":\\\"[]\\\",\\\"Armor Id\\\":\\\"[]\\\",\\\"State Id\\\":\\\"[]\\\"}\"}"]
 *
 * @param Formula Config
 * @parent Settings
 * @type struct<formulaConfigStruct>[]
 * @desc Define how skills and items deal damage to different aspects of Health using named formulas.
 * @default []
 *
 * @param Actor Config
 * @parent Settings
 * @type struct<actorConfigStruct>[]
 * @desc Define Health properties for actors.
 * @default []
 *
 * @param Class Config
 * @parent Settings
 * @type struct<classConfigStruct>[]
 * @desc Define Health properties for classes.
 * @default []
 *
 * @param Enemy Config
 * @parent Settings
 * @type struct<enemyConfigStruct>[]
 * @desc Define Health properties for enemies.
 * @default []
 *
 * @param Use Health Battle Status
 * @parent Settings
 * @type boolean
 * @desc Use the custom Battle Status window?
 * @default true
 * @on Yes
 * @off No
 *
 * @param Use Custom Terms
 * @parent Settings
 * @type boolean
 * @desc Custom Actor Terms for HP, MP and TP require overwriting core code so this option must be explicitly enabled to use.
 * @default false
 * @on Yes
 * @off No
 *
 * @param Add to Formulas
 * @parent Settings
 * @type boolean
 * @desc Health abbreviations can be used in formula boxes.
 * @default true
 * @on Yes
 * @off No
 *
 * @param Save Health Object
 * @parent Settings
 * @type boolean
 * @desc Changes to $dataHealth can be changed in-game and are persisted.
 * @default false
 * @on Yes
 * @off No
 *
 * @param Limit Party Size
 * @parent Settings
 * @type number
 * @desc Health effects will only be applied to the first X members of the party.
 * @default 99
 * @min 0
 *
 * @param Show Max Health
 * @parent Style
 * @type boolean
 * @desc Shows or hides the Max Health value on the Status screen.
 * @default true
 * @on Show
 * @off Hide
 *
 * @param Alert Config
 * @parent Style
 * @type struct<alertStruct>
 * @desc Configure alert message window properties.
 * @default {}
 *
 * @param Color Config
 * @parent Style
 * @type struct<colorConfigStruct>
 * @desc Configure the gauge colors.
 * @default {"Attributes":"[\"{\\\"Min Percent\\\":\\\"0\\\",\\\"Max Percent\\\":\\\"100\\\",\\\"Start Color\\\":\\\"#8020A0\\\",\\\"End Color\\\":\\\"#B050FF\\\"}\"]","Decremental":"[\"{\\\"Min Percent\\\":\\\"0\\\",\\\"Max Percent\\\":\\\"15\\\",\\\"Start Color\\\":\\\"#A00000\\\",\\\"End Color\\\":\\\"#FF0000\\\"}\",\"{\\\"Min Percent\\\":\\\"16\\\",\\\"Max Percent\\\":\\\"50\\\",\\\"Start Color\\\":\\\"#B0B000\\\",\\\"End Color\\\":\\\"#FFFF00\\\"}\",\"{\\\"Min Percent\\\":\\\"51\\\",\\\"Max Percent\\\":\\\"100\\\",\\\"Start Color\\\":\\\"#008000\\\",\\\"End Color\\\":\\\"#00B000\\\"}\"]","Equilibrium":"[\"{\\\"Min Percent\\\":\\\"0\\\",\\\"Max Percent\\\":\\\"25\\\",\\\"Start Color\\\":\\\"#0000A0\\\",\\\"End Color\\\":\\\"#0000FF\\\"}\",\"{\\\"Min Percent\\\":\\\"26\\\",\\\"Max Percent\\\":\\\"74\\\",\\\"Start Color\\\":\\\"#008000\\\",\\\"End Color\\\":\\\"#00B000\\\"}\",\"{\\\"Min Percent\\\":\\\"75\\\",\\\"Max Percent\\\":\\\"100\\\",\\\"Start Color\\\":\\\"#A00000\\\",\\\"End Color\\\":\\\"#FF0000\\\"}\"]","Incremental":"[\"{\\\"Min Percent\\\":\\\"0\\\",\\\"Max Percent\\\":\\\"15\\\",\\\"Start Color\\\":\\\"#A00000\\\",\\\"End Color\\\":\\\"#FF0000\\\"}\",\"{\\\"Min Percent\\\":\\\"16\\\",\\\"Max Percent\\\":\\\"50\\\",\\\"Start Color\\\":\\\"#B0B000\\\",\\\"End Color\\\":\\\"#FFFF00\\\"}\",\"{\\\"Min Percent\\\":\\\"51\\\",\\\"Max Percent\\\":\\\"100\\\",\\\"Start Color\\\":\\\"#00B0B0\\\",\\\"End Color\\\":\\\"#00F0F0\\\"}\"]"}
 *
 * @param Battle Config
 * @parent Style
 * @type struct<battleStruct>
 * @desc Configure how gauges look.
 * @default {"Use Enemy HP Gauge":"true","Use Damage Popup":"false","Enemy Gauge Width":"150","Battle Status Config":"{\"Actor Face Height\":\"60\",\"Gauge Rows\":\"5\",\"Gauge Columns\":\"2\",\"Name Left Padding\":\"1\",\"Value Right Padding\":\"6\",\"Top Padding\":\"0\",\"Font Size\":\"12\",\"Gauges\":\"[\\\"{\\\\\\\"Health Abbr\\\\\\\":\\\\\\\"hp\\\\\\\",\\\\\\\"Columns\\\\\\\":\\\\\\\"2\\\\\\\",\\\\\\\"Show Name\\\\\\\":\\\\\\\"true\\\\\\\",\\\\\\\"Show Value\\\\\\\":\\\\\\\"true\\\\\\\"}\\\",\\\"{\\\\\\\"Health Abbr\\\\\\\":\\\\\\\"mp\\\\\\\",\\\\\\\"Columns\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"Show Name\\\\\\\":\\\\\\\"true\\\\\\\",\\\\\\\"Show Value\\\\\\\":\\\\\\\"true\\\\\\\"}\\\",\\\"{\\\\\\\"Health Abbr\\\\\\\":\\\\\\\"tp\\\\\\\",\\\\\\\"Columns\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"Show Name\\\\\\\":\\\\\\\"true\\\\\\\",\\\\\\\"Show Value\\\\\\\":\\\\\\\"true\\\\\\\"}\\\",\\\"{\\\\\\\"Health Abbr\\\\\\\":\\\\\\\"food\\\\\\\",\\\\\\\"Columns\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"Show Name\\\\\\\":\\\\\\\"true\\\\\\\",\\\\\\\"Show Value\\\\\\\":\\\\\\\"true\\\\\\\"}\\\",\\\"{\\\\\\\"Health Abbr\\\\\\\":\\\\\\\"water\\\\\\\",\\\\\\\"Columns\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"Show Name\\\\\\\":\\\\\\\"true\\\\\\\",\\\\\\\"Show Value\\\\\\\":\\\\\\\"true\\\\\\\"}\\\",\\\"{\\\\\\\"Health Abbr\\\\\\\":\\\\\\\"rest\\\\\\\",\\\\\\\"Columns\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"Show Name\\\\\\\":\\\\\\\"true\\\\\\\",\\\\\\\"Show Value\\\\\\\":\\\\\\\"true\\\\\\\"}\\\",\\\"{\\\\\\\"Health Abbr\\\\\\\":\\\\\\\"oxygen\\\\\\\",\\\\\\\"Columns\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"Show Name\\\\\\\":\\\\\\\"true\\\\\\\",\\\\\\\"Show Value\\\\\\\":\\\\\\\"true\\\\\\\"}\\\",\\\"{\\\\\\\"Health Abbr\\\\\\\":\\\\\\\"psyche\\\\\\\",\\\\\\\"Columns\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"Show Name\\\\\\\":\\\\\\\"true\\\\\\\",\\\\\\\"Show Value\\\\\\\":\\\\\\\"true\\\\\\\"}\\\",\\\"{\\\\\\\"Health Abbr\\\\\\\":\\\\\\\"temp\\\\\\\",\\\\\\\"Columns\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"Show Name\\\\\\\":\\\\\\\"true\\\\\\\",\\\\\\\"Show Value\\\\\\\":\\\\\\\"true\\\\\\\"}\\\"]\"}"}
 *
 * @param Status Window
 * @parent Style
 * @type struct<statusWindowStruct>
 * @desc Configure how your Status Window looks.
 * @default {"Display Race":"true","Column 1":"Attributes","Health Stats 1":"[]","Column 2":"Health Stats","Health Stats 2":"[\"food\",\"water\",\"rest\",\"oxygen\",\"psyche\",\"temp\"]","Column 3":"Equipment","Health Stats 3":"[]"}
 *
 * @param Text Manager
 * @parent Style
 * @type struct<textManagerStruct>
 * @desc Format Battle Log Text.
 * @default {"Actor Health Damage":"%1 took %2 %3 damage!","Actor Health Drain":"%1 was drained of %2 %3!","Actor Health Recovery":"%1 recovered %2 %3!","Enemy Health Damage":"%1 took %2 %3 damage!","Enemy Health Drain":"%1 was drained of %2 %3!","Enemy Health Recovery":"%1 recovered %2 %3!"}
 */
/*~struct~healthStruct:
 * @param Name
 * @type text
 * @desc Name of this health aspect.
 *
 * @param Description
 * @type note
 * @desc Description of this health aspect.
 *
 * @param Abbreviation
 * @type text
 * @desc This is the abbreviated name that you will use to reference a health.  Don't use spaces or atk, def, agi etc.
 *
 * @param Max Health
 * @type number
 * @desc Maximum health value for this aspect.
 * @default 100
 * @min 1
 *
 * @param Control
 * @type select
 * @desc Controls how the value is applied. Increment raises the value, Decrement lowers it and Equilibrium moves towards the mid-point.
 * @default decremental
 * @option Decremental
 * @value decremental
 * @option Equilibrium
 * @value equilibrium
 * @option Incremental
 * @value incremental
 *
 * @param Starts At
 * @type select
 * @desc Health value starts at empty, half or full.
 * @default FULL
 * @option Full (Max Health)
 * @value FULL
 * @option Half (50% Health)
 * @value HALF
 * @option Empty (0 Health)
 * @value EMPTY
 *
 * @param Value
 * @type number
 * @desc Value to adjust this the Health HP by.
 * @default 1
 * @min 0
 *
 * @param Every X Steps
 * @type number
 * @desc Value adjusts after this many steps.
 * @default 100
 * @min 0
 *
 * @param State Management
 * @type struct<stateHealthStruct>[]
 * @desc Define how States are applied for this aspect of health.
 * @default []
 *
 * @param Adjustments
 * @type struct<adjustmentsStruct>
 * @desc Define actor, class, race, item and equipment specific adjustments to this aspect of health.
 * @default {}
 *
 * @param Enemy Parameters
 * @type struct<enemyParametersStruct>
 * @desc Define default Min and Max percent for enemies. Enemies will start battle in this range.
 * @default {}
 *
 * @param Show In Battle Log
 * @type boolean
 * @desc Show or hide damage to this Health in the Battle Log.
 * @default true
 * @on Show
 * @off Hide
 *
 * @param Recover All
 * @type boolean
 * @desc Health HP recovers to optimum value when Recover All command is executed.
 * @default true
 * @on Yes
 * @off No
 *
 * @param Battle Gauge Color
 * @type struct<gaugeColorStruct>
 * @desc Customize the battle gauge color.
 * @default {}
 *
 * @param Drain Health Abbr
 * @type text
 * @desc If this health exceeds critical limits, overflow is drawn from hp, mp or other health abbr.
 */
/*~struct~enemyParametersStruct:
 * @param Min Percent
 * @type number
 * @desc Minimum amount of Health HP enemies start battle with.
 * @min 0
 * @max 100
 *
 * @param Max Percent
 * @type number
 * @desc Maximum amount of Health HP enemies start battle with.
 * @min 0
 * @max 100
 */
/*~struct~adjustmentsStruct:
 * @param Actor
 * @type struct<actorAdjustStruct>[]
 * @desc Define actor specific adjustments.
 * @default []
 *
 * @param Class
 * @type struct<classAdjustStruct>[]
 * @desc Define class specific adjustments.
 * @default []
 *
 * @param Race
 * @type struct<raceAdjustStruct>[]
 * @desc Define race specific adjustments.
 * @default []
 *
 * @param Item
 * @type struct<itemAdjustStruct>[]
 * @desc Define item specific adjustments.
 * @default []
 *
 * @param Weapon
 * @type struct<weaponAdjustStruct>[]
 * @desc Define weapon specific adjustments.
 * @default []
 *
 * @param Armor
 * @type struct<armorAdjustStruct>[]
 * @desc Define armor specific adjustments.
 * @default []
 *
 * @param State
 * @type struct<stateAdjustStruct>[]
 * @desc Define state specific adjustments.
 * @default []
 *
 * @param Enemy
 * @type struct<enemyAdjustStruct>[]
 * @desc Define enemy specific adjustments.
 * @default []
 */
/*~struct~stateHealthStruct:
 * @param Description
 * @type text
 * @desc Description so you know what this entry is. Recommended but not required.
 *
 * @param State Id
 * @type state
 * @desc State that is applied while an actor is at a specified level of health.
 * @default 1
 *
 * @param Type
 * @type select
 * @desc Set how Min HP and Max HP are represented (Explicit Value or Percentage of Max)
 * @default VALUE
 * @option Explicit Value
 * @value VALUE
 * @option Percentage
 * @value PCT
 *
 * @param Min HP
 * @type number
 * @desc This State will be applied to an actor if this health score falls within the min and max percentage.
 * @default 0
 * @min 0
 *
 * @param Max HP
 * @type number
 * @desc This State will be applied to an actor if this health score falls within the min and max percentage.
 * @default 0
 * @min 0
 *
 * @param Add Percentage
 * @type float
 * @desc Odds per step that this State will be applied to any actor that falls within the min/max range.
 * @default 100
 * @min 0
 * @max 1000
 *
 * @param Remove Percentage
 * @type float
 * @desc Odds per step that this State will be removed for any actor that falls outside of the min/max range.
 * @default 100
 * @min 0
 * @max 1000
 *
 * @param Alert When Added
 * @type boolean
 * @desc
 * @default true
 * @on Yes
 * @off No
 *
 * @param Alert When Removed
 * @type boolean
 * @desc
 * @default false
 * @on Yes
 * @off No
 */
/*~struct~alertStruct:
 * @param Alert Position
 * @parent Parameters
 * @desc Window Position of the message box
 * @type select
 * @default Bottom
 * @option Top
 * @value Top
 * @option Middle
 * @value Middle
 * @option Bottom
 * @value Bottom
 *
 * @param Alert Background
 * @parent Parameters
 * @desc Background Type of the message box
 * @type select
 * @default Window
 * @option Window
 * @value Window
 * @option Dim
 * @value Dim
 * @option Transparent
 * @value Transparent
 */
/*~struct~actorAdjustStruct:
 * @param Description
 * @type text
 * @desc Description so you know what this entry is. Recommended but not required.
 *
 * @param Actor Id
 * @type actor
 * @desc The actor who has adjustments to the default health behavior.
 * @default 1
 *
 * @param Value
 * @type number
 * @desc The default Value will be adjusted by this amount.
 * @default 0
 * @min -9999
 *
 * @param Steps
 * @type number
 * @desc The default Every X Steps will be adjusted by this amount.
 * @default 0
 * @min -9999
 *
 * @param Add Percentage
 * @type float
 * @desc The default Add Percentage will be adjusted by this amount.
 * @default 100
 * @min 0
 * @max 1000
 *
 * @param Remove Percentage
 * @type float
 * @desc The default Remove Percentage will be adjusted by this amount.
 * @default 100
 * @min 0
 * @max 1000
 *
 * @param Bonus/Penalty
 * @type number
 * @desc Static bonus or penalty to this health attribute.
 * @default 0
 * @min -9999
 *
 * @param Immune
 * @type boolean
 * @desc Disables Health adjustments when true.
 * @default false
 * @on Yes
 * @off No
 *
 * @param Visible
 * @type boolean
 * @desc Health HP is visible.
 * @default true
 * @on Yes
 * @off No
 */
/*~struct~classAdjustStruct:
 * @param Description
 * @type text
 * @desc Description so you know what this entry is. Recommended but not required.
 *
 * @param Class Id
 * @type class
 * @desc The class that has adjustments to the default health behavior.
 * @default 1
 *
 * @param Value
 * @type number
 * @desc The default Value will be adjusted by this amount.
 * @default 0
 * @min -9999
 *
 * @param Steps
 * @type number
 * @desc The default Every X Steps will be adjusted by this amount.
 * @default 0
 * @min -9999
 *
 * @param Add Percentage
 * @type float
 * @desc The default Add Percentage will be adjusted by this amount.
 * @default 100
 * @min 0
 * @max 1000
 *
 * @param Remove Percentage
 * @type float
 * @desc The default Remove Percentage will be adjusted by this amount.
 * @default 0
 * @min 0
 * @max 1000
 *
 * @param Bonus/Penalty
 * @type number
 * @desc Static bonus or penalty to this health attribute.
 * @default 0
 * @min -9999
 *
 * @param Immune
 * @type boolean
 * @desc Disables Health adjustments when true.
 * @default false
 * @on Yes
 * @off No
 *
 * @param Visible
 * @type boolean
 * @desc Health HP is visible.
 * @default true
 * @on Yes
 * @off No
 */
/*~struct~raceAdjustStruct:
 * @param Description
 * @type text
 * @desc Description so you know what this entry is. Recommended but not required.
 *
 * @param Race Id
 * @type number
 * @desc The Race ID as defined in the FROG_RaceCore plugin.
 * @default 1
 *
 * @param Value
 * @type number
 * @desc The default Value will be adjusted by this amount.
 * @default 0
 * @min -9999
 *
 * @param Steps
 * @type number
 * @desc The default Every X Steps will be adjusted by this amount.
 * @default 0
 * @min -9999
 *
 * @param Add Percentage
 * @type float
 * @desc The default Add Percentage will be adjusted by this amount.
 * @default 100
 * @min 0
 * @max 1000
 *
 * @param Remove Percentage
 * @type float
 * @desc The default Remove Percentage will be adjusted by this amount.
 * @default 100
 * @min 0
 * @max 1000
 *
 * @param Bonus/Penalty
 * @type number
 * @desc Static bonus or penalty to this health attribute.
 * @default 0
 * @min -9999
 *
 * @param Immune
 * @type boolean
 * @desc Disables Health adjustments when true.
 * @default false
 * @on Yes
 * @off No
 *
 * @param Visible
 * @type boolean
 * @desc Health HP is visible.
 * @default true
 * @on Yes
 * @off No
 */
/*~struct~itemAdjustStruct:
 * @param Description
 * @type text
 * @desc Description so you know what this entry is. Recommended but not required.
 *
 * @param Item Id
 * @type item
 * @desc The item that has adjustments to the default health behavior.
 * @default 1
 *
 * @param Value
 * @type number
 * @desc The default Value will be adjusted by this amount.
 * @default 0
 * @min -9999
 *
 * @param Steps
 * @type number
 * @desc The default Every X Steps will be adjusted by this amount.
 * @default 0
 * @min -9999
 *
 * @param Add Percentage
 * @type float
 * @desc The default Add Percentage will be adjusted by this amount.
 * @default 100
 * @min 0
 * @max 1000
 *
 * @param Remove Percentage
 * @type float
 * @desc The default Remove Percentage will be adjusted by this amount.
 * @default 100
 * @min 0
 * @max 1000
 *
 * @param Bonus/Penalty
 * @type number
 * @desc Static bonus or penalty to this health attribute.
 * @default 0
 * @min -9999
 *
 * @param Immune
 * @type boolean
 * @desc Disables Health adjustments when true.
 * @default false
 * @on Yes
 * @off No
 */
/*~struct~weaponAdjustStruct:
 * @param Description
 * @type text
 * @desc Description so you know what this entry is. Recommended but not required.
 *
 * @param Weapon Id
 * @type weapon
 * @desc The weapon that has adjustments to the default health behavior.
 * @default 1
 *
 * @param Value
 * @type number
 * @desc The default Value will be adjusted by this amount.
 * @default 0
 * @min -9999
 *
 * @param Steps
 * @type number
 * @desc The default Every X Steps will be adjusted by this amount.
 * @default 0
 * @min -9999
 *
 * @param Add Percentage
 * @type float
 * @desc The default Add Percentage will be adjusted by this amount.
 * @default 100
 * @min 0
 * @max 1000
 *
 * @param Remove Percentage
 * @type float
 * @desc The default Remove Percentage will be adjusted by this amount.
 * @default 100
 * @min 0
 * @max 1000
 *
 * @param Bonus/Penalty
 * @type number
 * @desc Static bonus or penalty to this health attribute.
 * @default 0
 * @min -9999
 *
 * @param Immune
 * @type boolean
 * @desc Disables Health adjustments when true.
 * @default false
 * @on Yes
 * @off No
 */
/*~struct~armorAdjustStruct:
 * @param Description
 * @type text
 * @desc Description so you know what this entry is. Recommended but not required.
 *
 * @param Armor Id
 * @type armor
 * @desc The armor that has adjustments to the default health behavior.
 * @default 1
 *
 * @param Value
 * @type number
 * @desc The default Value will be adjusted by this amount.
 * @default 0
 * @min -9999
 *
 * @param Steps
 * @type number
 * @desc The default Every X Steps will be adjusted by this amount.
 * @default 0
 * @min -9999
 *
 * @param Add Percentage
 * @type float
 * @desc The default Add Percentage will be adjusted by this amount.
 * @default 100
 * @min 0
 * @max 1000
 *
 * @param Remove Percentage
 * @type float
 * @desc The default Remove Percentage will be adjusted by this amount.
 * @default 100
 * @min 0
 * @max 1000
 *
 * @param Bonus/Penalty
 * @type number
 * @desc Static bonus or penalty to this health attribute.
 * @default 0
 * @min -9999
 *
 * @param Immune
 * @type boolean
 * @desc Disables Health adjustments when true.
 * @default false
 * @on Yes
 * @off No
 */
/*~struct~stateAdjustStruct:
 * @param Description
 * @type text
 * @desc Description so you know what this entry is. Recommended but not required.
 *
 * @param State Id
 * @type state
 * @desc The state that has adjustments to the default health behavior.
 * @default 1
 *
 * @param Value
 * @type number
 * @desc The default Value will be adjusted by this amount.
 * @default 0
 * @min -9999
 *
 * @param Steps
 * @type number
 * @desc The default Every X Steps will be adjusted by this amount.
 * @default 0
 * @min -9999
 *
 * @param Add Percentage
 * @type float
 * @desc The default Add Percentage will be adjusted by this amount.
 * @default 100
 * @min 0
 * @max 1000
 *
 * @param Remove Percentage
 * @type float
 * @desc The default Remove Percentage will be adjusted by this amount.
 * @default 100
 * @min 0
 * @max 1000
 *
 * @param Bonus/Penalty
 * @type number
 * @desc Static bonus or penalty to this health attribute.
 * @default 0
 * @min -9999
 *
 * @param Immune
 * @type boolean
 * @desc Disables Health adjustments when true.
 * @default false
 * @on Yes
 * @off No
 */
/*~struct~enemyAdjustStruct:
 * @param Description
 * @type text
 * @desc Description so you know what this entry is. Recommended but not required.
 *
 * @param Enemy Id
 * @type enemy
 * @desc The actor who has adjustments to the default health behavior.
 * @default 1
 *
 * @param Add Percentage
 * @type float
 * @desc The default Add Percentage will be adjusted by this amount.
 * @default 100
 * @min 0
 * @max 1000
 *
 * @param Remove Percentage
 * @type float
 * @desc The default Remove Percentage will be adjusted by this amount.
 * @default 100
 * @min 0
 * @max 1000
 *
 * @param Bonus/Penalty
 * @type number
 * @desc Static bonus or penalty to this health attribute.
 * @default 0
 * @min -9999
 *
 * @param Immune
 * @type boolean
 * @desc Disables Health adjustments when true.
 * @default false
 * @on Yes
 * @off No
 */
/*~struct~conditionStruct:
 * @param Name
 * @type text
 * @desc Name of this Condition.  You will reference this name in Plugin parameters.
 *
 * @param Description
 * @type note
 * @desc Description of this condition. This is just for your reference so it's not required.
 *
 * @param Icon Id
 * @type number
 * @desc Icon Id
 * @default 0
 * @min 0
 *
 * @param Adjust Health
 * @type struct<conditionHealthStruct>[]
 * @desc Define adjustments to Health when this Condition is active.
 *
 * @param Set Common Event
 * @type common_event
 * @desc Common Event runs when this Condition is set.
 * @default 0
 *
 * @param Remove Common Event
 * @type common_event
 * @desc Common Event runs when this Condition is removed.
 * @default 0
 *
 * @param Immune
 * @type struct<conditionImmuneStruct>
 * @desc Actors, classes, items, states etc. that are immune to effects of this condition.
 * @default {"Actor Id":"[]","Class Id":"[]","Race Id":"[]","Item Id":"[]","Weapon Id":"[]","Armor Id":"[]","State Id":"[]"}
 */
/*~struct~conditionImmuneStruct:
 * @param Actor Id
 * @type actor[]
 * @desc Actors that grant immunity to this condition.
 * @default []
 *
 * @param Class Id
 * @type class[]
 * @desc Classes that grant immunity to this condition.
 * @default []
 *
 * @param Race Id
 * @type number[]
 * @desc Races that grant immunity to this condition.
 * @default []
 *
 * @param Item Id
 * @type item[]
 * @desc Items that grant immunity to this condition.
 * @default []
 *
 * @param Weapon Id
 * @type weapon[]
 * @desc Weapons that grant immunity to this condition.
 * @default []
 *
 * @param Armor Id
 * @type armor[]
 * @desc Armor that grant immunity to this condition.
 * @default []
 *
 * @param State Id
 * @type state[]
 * @desc States that grant immunity to this condition.
 * @default []
 */
/*~struct~conditionHealthStruct:
 * @param Health Abbr
 * @type text
 * @desc This is the abbreviated name of the aspect of Health this condition changes.
 *
 * @param Control
 * @type select
 * @desc Controls how the value is applied. Increment raises the value, Decrement lowers it and Equilibrium moves towards the mid-point.
 * @default default
 * @option Default
 * @value default
 * @option Decremental
 * @value decremental
 * @option Equilibrium
 * @value equilibrium
 * @option Incremental
 * @value incremental
 *
 * @param Adjust Value
 * @type number
 * @desc The default Value will be adjusted by this amount.
 * @default 0
 * @min -9999
 *
 * @param Adjust Steps
 * @type number
 * @desc The default Every X Steps will be adjusted by this amount.
 * @default 0
 * @min -9999
 *
 * param Range Type
 * type select
 * desc Set how lower and upper values are represented (Explicit Value or Percentage of Max)
 * default VALUE
 * option Explicit Value
 * value VALUE
 * option Percentage
 * value PCT
 *
 * param Lower Health Range
 * type number
 * desc The minimum percentage of Health HP this condition can lower an actor to.
 * default 0
 * min 0
 * max 100
 *
 * param Upper Health Range
 * type number
 * desc The maximum percentage of Health HP this condition can raise an actor to.
 * default 100
 * min 0
 * max 100
 *
 * @param Immune
 * @type boolean
 * @desc Disables Health adjustments when Condition is active.
 * @default false
 * @on Yes
 * @off No
 */
/*~struct~formulaConfigStruct:
 * @param Name
 * @type text
 * @desc Reference Name for this formula.
 *
 * @param Damage
 * @type struct<damageStruct>[]
 * @desc Define however many damage formulas you need and which aspects of Health are affected.
 * @default []
 *
 * @param Register As Damage
 * @type boolean
 * @desc This Skill counts as a hit and will activate a State's Remove by Damage property.
 * @default true
 * @on Yes
 * @off No
 */
/*~struct~damageStruct:
 * @param Health Abbr
 * @type text
 * @desc The Health abbreviation. Use 'hp' for normal Hit Point damage and 'mp' for Magic Point damage.
 *
 * @param Formula
 * @type note
 * @desc This is the formula that will run when it's name is placed in a formula box.
 *
 * @param Show Damage
 * @type boolean
 * @desc Damage is shown in battle log and visibly affects the target.
 * @default true
 * @on Yes
 * @off No
 *
 * @param Flip Damage
 * @type boolean
 * @desc Damage becomes Recovery or Recovery becomes Damage for this hit.
 * @default false
 * @on Yes
 * @off No
 *
 * @param Min 1 Damage
 * @type boolean
 * @desc Sets the minimum damage to 1 Health HP as opposed to zero.
 * @default true
 * @on Yes
 * @off No
 */
/*~struct~actorConfigStruct:
 * @param Description
 * @type text
 * @desc Description so you know what this entry is. Recommended but not required.
 *
 * @param Actor Id
 * @type actor
 * @desc Actor that these properties apply to.
 * @default 0
 *
 * @param Custom Terms
 * @type struct<customTermsStruct>
 * @desc Change the names for HP, MP and/or TP. An entry for None acts as a global fallback.
 * @default {}
 */
/*~struct~classConfigStruct:
 * @param Description
 * @type text
 * @desc Description so you know what this entry is. Recommended but not required.
 *
 * @param Class Id
 * @type class
 * @desc Class that these properties apply to.
 * @default 1
 *
 * @param Custom Terms
 * @type struct<customTermsStruct>
 * @desc Change the names for HP, MP and/or TP. An entry for None acts as a global fallback.
 * @default {}
 *
 * @param Level Up
 * @type struct<levelUpStruct>[]
 * @desc Configure how Health HP increases on level up.
 * @default []
 */
/*~struct~enemyConfigStruct:
 * @param Description
 * @type text
 * @desc Description so you know what this entry is. Recommended but not required.
 *
 * @param Enemy Id
 * @type enemy
 * @desc Enemy that these properties apply to.
 * @default 0
 *
 * @param Custom Terms
 * @type struct<customTermsStruct>
 * @desc Change the names for HP, MP and/or TP. An entry for None acts as a global fallback.
 * @default {}
 */
/*~struct~customTermsStruct:
 * @param HP Name
 * @type text
 * @desc Change the term HP for this actor.
 * @default
 *
 * @param HP Abbr
 * @type text
 * @desc Change the term HP (abbr.) for this actor.
 * @default
 *
 * @param MP Name
 * @type text
 * @desc Change the term MP for this actor.
 * @default
 *
 * @param MP Abbr
 * @type text
 * @desc Change the term MP (abbr.) for this actor.
 * @default
 *
 * @param TP Name
 * @type text
 * @desc Change the term TP for this actor.
 * @default
 *
 * @param TP Abbr
 * @type text
 * @desc Change the term TP (abbr.) for this actor.
 * @default
 */
/*~struct~levelUpStruct:
 * @param Health Abbr
 * @type text
 * @desc The Health abbreviation.
 *
 * @param Starting Max HP
 * @type number
 * @desc Use this to overwrite the default Max HP. Leave at 0 to use the default as defined in Health Config.
 * @default 0
 * @min 0
 *
 * @param Lower Level Gain
 * @type number
 * @desc Each level, an actor with this class will gain at least this amount of additional Health HP.
 * @default 0
 * @min 0
 *
 * @param Upper Level Gain
 * @type number
 * @desc Each level, an actor with this class will gain no more than this amount of additional Health HP.
 * @default 0
 * @min 0
 */
/*~struct~statusWindowStruct:
 * @param Display Race
 * @type boolean
 * @desc Nickname is replaced with Race if FROG Race is installed.
 * @default true
 * @on Yes
 * @off No
 *
 * @param Column 1
 * @type select
 * @desc Choose what is displayed in the first column.
 * @default Attributes
 * @option Attributes
 * @value Attributes
 * @option Equipment
 * @value Equipment
 * @option Health Stats
 * @value Health Stats
 *
 * @param Health Stats 1
 * @type text[]
 * @desc If Health Stats chosen, list them in display order.
 * @default []
 *
 * @param Column 2
 * @type select
 * @desc Choose what is displayed in the first column.
 * @default Attributes
 * @option Attributes
 * @value Attributes
 * @option Equipment
 * @value Equipment
 * @option Health Stats
 * @value Health Stats
 *
 * @param Health Stats 2
 * @type text[]
 * @desc If Health Stats chosen, list them in display order.
 * @default []
 *
 * @param Column 3
 * @type select
 * @desc Choose what is displayed in the first column.
 * @default Attributes
 * @option Attributes
 * @value Attributes
 * @option Equipment
 * @value Equipment
 * @option Health Stats
 * @value Health Stats
 *
 * @param Health Stats 3
 * @type text[]
 * @desc If Health Stats chosen, list them in display order.
 * @default []
 */
/*~struct~basicManagementStruct:
 * @param Hp State Management
 * @type struct<stateHealthStruct>[]
 * @desc Apply states to actors when their HP reaches certain levels.
 * @default []
 *
 * @param Mp State Management
 * @type struct<stateHealthStruct>[]
 * @desc Apply states to actors when their MP reaches certain levels.
 * @default []
 *
 * @param Tp State Management
 * @type struct<stateHealthStruct>[]
 * @desc Apply states to actors when their TP reaches certain levels.
 * @default []
 */
/*~struct~colorConfigStruct:
 * @param Attributes
 * @type struct<colorStruct>[]
 * @desc Define the colors for the Attribute gauges.
 *
 * @param Decremental
 * @type struct<colorStruct>[]
 * @desc Define the colors for Decremental Health gauges.
 *
 * @param Equilibrium
 * @type struct<colorStruct>[]
 * @desc Define the colors for Equilibrium Health gauges.
 *
 * @param Incremental
 * @type struct<colorStruct>[]
 * @desc Define the colors for Incremental Health gauges.
 */
/*~struct~colorStruct:
 * @param Min Percent
 * @type number
 * @desc Minimum percentage for this color.
 * @default 0
 * @min 0
 * @max 100
 *
 * @param Max Percent
 * @type number
 * @desc Maximum percentage for this color.
 * @default 100
 * @min 0
 * @max 100
 *
 * @param Start Color
 * @type text
 * @desc Hex color that this type of gauge starts with on the left.
 *
 * @param End Color
 * @type text
 * @desc Hex color that this type of gauge ends with on the right.
 */
/*~struct~gaugeColorStruct:
 * @param Start Color
 * @type text
 * @desc Hex color that this gauge starts with on the left.
 *
 * @param End Color
 * @type text
 * @desc Hex color that this gauge ends with on the right.
 */
/*~struct~battleStruct:
 * @param Use Enemy HP Gauge
 * @type boolean
 * @desc Enable or disable Health HP Gauges in battle.
 * @default true
 * @on Yes
 * @off No
 *
 * @param Use Damage Popup
 * @type boolean
 * @desc Enable or disable the numbers that normally popup in battle when damage is dealt.
 * @default false
 * @on Yes
 * @off No
 *
 * @param Enemy Gauge Width
 * @type number
 * @desc Width of the battle Health HP gauges.
 * @default 150
 * @min 50
 *
 * @param Enemy Gauge List
 * @type text[]
 * @desc Global list of enemy gauges to display during battle. Any abbreviations left off this list won't show in battle.
 * @default []
 *
 * @param Battle Status Config
 * @type struct<battleStatusStruct>
 * @desc Configure the default Battle Status Window
 * @default {}
 */
/*~struct~battleStatusStruct:
 * @param Actor Face Height
 * @type number
 * @desc Height of the Actor's face.
 * @default 60
 * @min 10
 *
 * @param Gauge Rows
 * @type number
 * @desc Number of rows for Health gauges
 * @default 5
 * @min 1
 * @max 20
 *
 * @param Gauge Columns
 * @type number
 * @desc Number of columns for Health gauges
 * @default 2
 * @min 1
 * @max 10
 *
 * @param Name Left Padding
 * @type number
 * @desc Adjust the padding on the left for the HP text
 * @default 1
 * @min 0
 *
 * @param Value Right Padding
 * @type number
 * @desc Adjust the padding on the right for the HP value
 * @default 6
 * @min 0
 *
 * @param Top Padding
 * @type number
 * @desc Adjust the padding on the top if you need to push the text down some
 * @default 0
 * @min 0
 *
 * @param Font Size
 * @type number
 * @desc Font size for battle gauge text
 * @default 12
 * @min 6
 * @max 50
 *
 * @param Gauges
 * @type struct<battleStatusGaugeStruct>[]
 * @desc Configure the gauges in the default Battle Status Window
 * @default ["{\"Health Abbr\":\"hp\",\"Columns\":\"2\",\"Show Name\":\"true\",\"Show Value\":\"true\"}","{\"Health Abbr\":\"mp\",\"Columns\":\"1\",\"Show Name\":\"true\",\"Show Value\":\"true\"}","{\"Health Abbr\":\"tp\",\"Columns\":\"1\",\"Show Name\":\"true\",\"Show Value\":\"true\"}","{\"Health Abbr\":\"food\",\"Columns\":\"1\",\"Show Name\":\"true\",\"Show Value\":\"true\"}","{\"Health Abbr\":\"water\",\"Columns\":\"1\",\"Show Name\":\"true\",\"Show Value\":\"true\"}","{\"Health Abbr\":\"rest\",\"Columns\":\"1\",\"Show Name\":\"true\",\"Show Value\":\"true\"}","{\"Health Abbr\":\"oxygen\",\"Columns\":\"1\",\"Show Name\":\"true\",\"Show Value\":\"true\"}","{\"Health Abbr\":\"psyche\",\"Columns\":\"1\",\"Show Name\":\"true\",\"Show Value\":\"true\"}","{\"Health Abbr\":\"temp\",\"Columns\":\"1\",\"Show Name\":\"true\",\"Show Value\":\"true\"}"]
 */
/*~struct~battleStatusGaugeStruct:
 * @param Health Abbr
 * @type text
 * @desc The Health abbreviation.
 *
 * @param Columns
 * @type number
 * @desc Number of columns that this Health gauge takes
 * @default 1
 * @min 1
 * @max 10
 *
 * @param Show Name
 * @type boolean
 * @desc Show the health abbreviation on the battle gauge
 * @default true
 * @on Yes
 * @off No
 *
 * @param Show Value
 * @type boolean
 * @desc Show the health value on the battle gauge
 * @default true
 * @on Yes
 * @off No
 */
/*~struct~textManagerStruct:
 * @param Actor Health Damage
 * @type text
 * @desc Sets the text format for Actor Health Damage. 1 = Actor Name, 2 = Damage, 3 = Damage Type.
 * @default %1 took %2 %3 damage!
 *
 * @param Actor Health Drain
 * @type text
 * @desc Sets the text format for Actor Health Drain. 1 = Actor Name, 2 = Drain, 3 = Damage Type.
 * @default %1 was drained of %2 %3!
 *
 * @param Actor Health Recovery
 * @type text
 * @desc Sets the text format for Actor Health Recovery. 1 = Actor Name, 2 = Recover, 3 = Damage Type.
 * @default %1 recovered %2 %3!
 *
 * @param Enemy Health Damage
 * @type text
 * @desc Sets the text format for Enemy Health Damage. 1 = Enemy Name, 2 = Damage, 3 = Damage Type.
 * @default %1 took %2 %3 damage!
 *
 * @param Enemy Health Drain
 * @type text
 * @desc Sets the text format for Enemy Health Drain. 1 = Enemy Name, 2 = Drain, 3 = Damage Type.
 * @default %1 was drained of %2 %3!
 *
 * @param Enemy Health Recovery
 * @type text
 * @desc Sets the text format for Enemy Health Recovery. 1 = Enemy Name, 2 = Recover, 3 = Damage Type.
 * @default %1 recovered %2 %3!
 */

var $dataHealth = {};

/* ---------------------------------------------------------------*\
                        Add to Formulas
\* -------------------------------------------------------------- */

// Add properties to Game_BattlerBase so that health can be used in formulas
FROG.Health.prm = PluginManager.parameters('FROG_Health');
FROG.Health.healthConfig = (FROG.Health.prm['Health Config']) ? JSON.parse(FROG.Health.prm['Health Config']) : [];
FROG.Health.useCustomTerms = (FROG.Health.prm['Use Custom Terms'] === "true");
FROG.Health.useHealthBattleStatus = (FROG.Health.prm['Use Health Battle Status'] === "true");

if (FROG.Health.prm['Add to Formulas'] === "true") {
    var bOk = false;
    var evalStr = "Object.defineProperties (Game_BattlerBase.prototype, {";
    for (var i=0; i<FROG.Health.healthConfig.length; i++) {
        var param = JSON.parse(FROG.Health.healthConfig[i]).Abbreviation;
        if (param) {
            evalStr += "" +
                param + ": { " +
                "   get: function () { " +
                "      return this.getHelath('" + param + "').hp || 0; " +
                "   }, " +
                "   configurable: true " +
                "}, ";
            bOk = true;
        }
    }
    evalStr = evalStr.slice(0, -1) + " });";
    if (bOk) eval(evalStr);
    i = bOk = evalStr = param = FROG.Health.prm = FROG.Health.healthConfig = undefined;
}

/* ---------------------------------------------------------------*\
                            Data Manager
\* -------------------------------------------------------------- */

FROG.Health.DataManager_IsDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function () {
    if (!FROG.Health.DataManager_IsDatabaseLoaded.call(this)) return false;
    FROG.Core.jsonParams(PluginManager.parameters('FROG_Health'), $dataHealth);
    //console.log($dataHealth);
    return true;
}

// Save File
FROG.Health.DataManager_MakeSaveContents = DataManager.makeSaveContents;
DataManager.makeSaveContents = function() {
    var contents = FROG.Health.DataManager_MakeSaveContents.call(this);
    if (FROG.Health.saveHealthObject === true) {
        contents.health = $dataHealth;
    }
    return contents;
}

// Load File
FROG.Health.DataManager_ExtractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function(contents) {
    FROG.Health.DataManager_ExtractSaveContents.call(this, contents);
    if (FROG.Health.saveHealthObject === true) {
        $dataHealth = contents.health;
    }
}

/* ---------------------------------------------------------------*\
                            Game Actor
\* -------------------------------------------------------------- */

// Initialize actor health when game starts
FROG.Health.Game_Actor_setup = Game_Actor.prototype.setup;
Game_Actor.prototype.setup = function (actorId) {
    FROG.Health.Game_Actor_setup.call(this, actorId);
    this._health = {};

    for (var i=0; i<$dataHealth.healthConfig.length; i++) {
        var h = $dataHealth.healthConfig[i];
        if (h && h.abbreviation) {
            var abbr = h.abbreviation.toLowerCase().trim();

            // Starting Max HP
            var maxHP = this.getClassLevelUpHealth(abbr).startingMaxHP || h.maxHealth;

            // Starting HP
            switch (h.startsAt) {
                case "FULL": var hp = maxHP; break;
                case "HALF": var hp = parseInt(maxHP / 2); break;
                case "EMPTY": var hp = 0; break;
            }

            // Set Actor Health HP
            this._health[abbr] = {
                name: h.name,
                desc: h.description,
                control: h.control,
                startsAt: h.startsAt,
                hp: hp,
                mhp: maxHP,
                recover: h.recoverAll,
                drainAbbr: h.drainHealthAbbr
            }
        }
    }
}

/** Gets the Level Up object in Class Config
 * @param {string} abbr - Health Abbreviation
 * @returns {object} returns Class Config Level Up object
 */
Game_Actor.prototype.getClassLevelUpHealth = function (abbr) {
    var self = this;
    if (abbr) {
        var classConfig = $dataHealth.classConfig.filter(function (config) {
            return self._classId === config.classId;
        })[0] || null;

        if (classConfig && classConfig.levelUp) {
            return levelConfig = classConfig.levelUp.filter(function (config) {
                return config.healthAbbr.toLowerCase().trim() == abbr.toLowerCase().trim();
            })[0] || {};
        }
    }

    return {};
}

// Add talent points per level when actor levels up
FROG.Health.Game_Actor_LevelUp = Game_Actor.prototype.levelUp;
Game_Actor.prototype.levelUp = function () {
    FROG.Health.Game_Actor_LevelUp.call(this);
    var self = this;
    if (!FROG.Core.isEmpty(this._health)) {
        Object.keys(this._health).forEach(function(key, index) {
            var health = self._health[key];
            var levelUp = self.getClassLevelUpHealth(key);
            var gain = [levelUp.lowerLevelGain || levelUp.upperLevelGain || 0, levelUp.upperLevelGain || levelUp.lowerLevelGain || 0].sort();
            var value = FROG.Core.randomInt(gain[0], gain[1]);
            self.setHealth(key, {mhp: health.mhp + value});
        });
    }
}

/* ---------------------------------------------------------------*\
                            Game Enemy
\* -------------------------------------------------------------- */

// Initialize enemy Health HP when battle starts
FROG.Health.Game_Enemy_setup = Game_Enemy.prototype.setup;
Game_Enemy.prototype.setup = function (enemyId, x, y) {
    FROG.Health.Game_Enemy_setup.call(this, enemyId, x, y);
    var self = this;

    // Add enemy health
    this._health = {};
    for (var i=0; i<$dataHealth.healthConfig.length; i++) {
        var h = $dataHealth.healthConfig[i];
        if (h && h.abbreviation) {
            var abbr = h.abbreviation.toLowerCase().trim();
            var maxHP = h.maxHealth;
            var immune = false;

            // Adjustments
            if (!($dataHealth.battleConfig && $dataHealth.battleConfig.enemyGaugeList && $dataHealth.battleConfig.enemyGaugeList.length) || $dataHealth.battleConfig.enemyGaugeList.indexOf(abbr) === -1) {
                immune = true;
            }
            /*else if ($dataHealth.battleConfig.enemyGaugeList.indexOf(abbr) === -1) {
                immune = true;
            }*/

            if (h.adjustments && h.adjustments.enemy && h.adjustments.enemy.length) {
                var enemyAdjust = h.adjustments.enemy.filter(function (enemy) {
                    return enemy.enemyId == self._enemyId;
                })[0] || null;

                if (enemyAdjust) {
                    immune = immune || enemyAdjust.immune;
                    maxHP += enemyAdjust.bonusPenalty || 0;
                }
            }

            // Random Starting HP
            switch (h.startsAt) {
                case "FULL":
                    var lowerHP = maxHP * 0.5;
                    var upperHP = maxHP * 1;
                    break;
                case "HALF":
                    var lowerHP = maxHP * 0.25;
                    var upperHP = maxHP * 0.75;
                    break;
                case "EMPTY":
                    var lowerHP = 0;
                    var upperHP = maxHP * 0.5;
                    break;
            }

            // Custom random starting HP
            if (!FROG.Core.isEmpty(h.enemyParameters) && h.enemyParameters.maxPercent) {
                lowerHP = maxHP * (h.enemyParameters.minPercent / 100);
                upperHP = maxHP * (h.enemyParameters.maxPercent / 100);
            }

            // Initialize HP
            this._health[abbr] = {
                hp: FROG.Core.randomInt(lowerHP, upperHP),
                mhp: maxHP,
                control: h.control,
                drainAbbr: h.drainHealthAbbr,
                immune: immune
            }
        }
    }

    this.healthStates(false);
}

/* ---------------------------------------------------------------*\
                            Game Party
\* -------------------------------------------------------------- */

FROG.Health.Game_Party_Initialize = Game_Party.prototype.initialize;
Game_Party.prototype.initialize = function() {
    FROG.Health.Game_Party_Initialize.call(this);
    this._healthConditions = [];
    this._healthAlert = "";
}

FROG.Health.Game_Party_IncreaseSteps = Game_Party.prototype.increaseSteps;
Game_Party.prototype.increaseSteps = function() {
    FROG.Health.Game_Party_IncreaseSteps.call(this);
    var partySteps = this.steps();
    var aliveActors = this.aliveMembers();

    // Loop through Actors
    for (var i=0; i<aliveActors.length; i++) {
        if (i >= $dataHealth.limitPartySize) break;
        aliveActors[i].healthStates(true);
    }
}

/* ---------------------------------------------------------------*\
                        Game Battler
\* -------------------------------------------------------------- */

FROG.Health.Game_BattlerBase_RecoverAll = Game_BattlerBase.prototype.recoverAll;
Game_BattlerBase.prototype.recoverAll = function() {
    FROG.Health.Game_BattlerBase_RecoverAll.call(this);
    var self = this;
    if (!FROG.Core.isEmpty(this._health)) {
        Object.keys(this._health).forEach(function(key, index) {
            var health = self._health[key] || {};
            if (health.recover) {
                switch (health.startsAt) {
                    case "EMPTY":
                        self.setHealth(key, {hp: "0%"});
                        break;

                    case "FULL":
                        self.setHealth(key, {hp: "100%"});
                        break;

                    case "HALF":
                        self.setHealth(key, {hp: "50%"});
                        break;
                }
            }
        });
    }
}

// Manage Health States
Game_Battler.prototype.healthStates = function (performHpAdjustments) {
    var self = this;
    if (performHpAdjustments) {
        this.normalHealthStates();
    }
    var partySteps = $gameParty.steps();

    for (var i=0; i<$dataHealth.healthConfig.length; i++) {
        var health = $dataHealth.healthConfig[i];
        if (!health || !health.abbreviation) continue;

        var abbr = health.abbreviation;
        var hp = this.getHealth(abbr).hp;
        var mhp = this.getHealthMhp(abbr);
        var adjust = {
            control: health.control,
            steps: health.everyXSteps,
            value: health.value,
            addPercentage: 100,
            removePercentage: 100,
            //lower: 0,
            //upper: 100,
            immune: false,
            visible: true
        }

        // Conditions
        this.getConditionAdjustments(abbr, adjust);

        // Adjustments
        this.getHealthAdjustments(health.adjustments, adjust);

        // Adjust Health Values
        if (this.isActor() && performHpAdjustments === true && !adjust.immune && adjust.steps > 0 && adjust.value > 0 && partySteps % adjust.steps === 0) {
            //var lower = parseInt((adjust.lower / 100) * mhp);
            //var upper = parseInt((adjust.upper / 100) * mhp);

            switch (adjust.control) {
                case "incremental":
                    // Increment HP to upper limit
                    this.gainHealth(abbr, adjust.value);
                    // If raised above upper limit, reset to upper limit
                    /*if (this.getHealth(abbr).hp > upper) {
                        this.setHealth(abbr, { hp: upper });
                    }*/
                    break;

                case "decremental":
                    // Decrement HP to upper limit
                    this.gainHealth(abbr, adjust.value * -1);
                    // If reduced below lower limit, reset to lower limit
                    /*if (this.getHealth(abbr).hp < lower) {
                        this.setHealth(abbr, { hp: lower });
                    }*/
                    break;

                case "equilibrium":
                    var midPoint = parseInt(mhp / 2);
                    if (hp < midPoint) {
                        this.gainHealth(abbr, adjust.value);
                        if (this.getHealth(abbr).hp > midPoint) {
                            this.setHealth(abbr, { hp: midPoint });
                        }
                    }
                    else if (hp > midPoint) {
                        this.gainHealth(abbr, adjust.value * -1)
                        if (this.getHealth(abbr).hp < midPoint) {
                            this.setHealth(abbr, { hp: midPoint });
                        }
                    }
                    break;
            }
        }

        // Grab possibly new HP value
        hp = this.getHealth(abbr).hp;

        // Apply/Remove States
        for (var k=0; k<health.stateManagement.length; k++) {
            var state = health.stateManagement[k];
            this.manageHealthState(state, hp, mhp, adjust);
        }

        // Show health alert
        if ($gameParty._healthAlert && !$gameParty.inBattle()) {
            if ($dataHealth.alertConfig) {
                var alertPosition = 2;
                var alertBackground = 0;

                switch ($dataHealth.alertConfig.alertPosition) {
                    case 'Top': alertPosition = 0; break;
                    case 'Middle': alertPosition = 1; break;
                    case 'Bottom': alertPosition = 2; break;
                }

                switch ($dataHealth.alertConfig.alertBackground) {
                    case 'Window': alertBackground = 0; break;
                    case 'Dim': alertBackground = 1; break;
                    case 'Transparent': alertBackground = 2; break;
                }

                $gameMessage.setPositionType(alertPosition);
                $gameMessage.setBackground(alertBackground);
            }

            $gameMessage.add($gameParty._healthAlert);
            $gameParty._healthAlert = "";
        }
    }
}

// Filter out conditions that this actor is immune to
Game_Battler.prototype.getActiveConditions = function () {
    var self = this;
    if (this.isActor()) {
        return $gameParty._healthConditions.filter(function (cond) {
            var bOk = true;
            var immune = cond.immune || null;
            if (immune) {
                // Actor
                if (immune.actorId.indexOf(self.actorId()) > -1) bOk = false;

                // Class
                if (immune.classId.indexOf(self._classId) > -1) bOk = false;

                // Race
                if (Imported.FROG_Races === true && immune.raceId.indexOf(self.raceId()) > -1) bOk = false;

                // Item
                for (var i=0; i<immune.itemId.length; i++) {
                    var item = $dataItems[immune.itemId[i]];
                    if ($gameParty.hasItem(item)) bOk = false;
                }

                // Weapon
                for (var i=0; i<immune.weaponId.length; i++) {
                    var weapon = $dataWeapons[immune.weaponId[i]];
                    if (self.isEquipped(weapon)) bOk = false;
                }

                // Armor
                for (var i=0; i<immune.armorId.length; i++) {
                    var armor = $dataArmors[immune.armorId[i]];
                    if (self.isEquipped(armor)) bOk = false;
                }

                // States
                for (var i=0; i<immune.stateId.length; i++) {
                    if (self.isStateAffected(immune.stateId[i])) bOk = false;
                }
            }
            return bOk;
        });
    }

    return [];
}

// Get relevant conditions to this health attribute
Game_Battler.prototype.getConditionAdjustments = function (abbr, adjust) {
    var conditions = this.getActiveConditions();

    // Make sure at least one condition is active before applying lower health range
    /*if (conditions.length) {
        adjust.lower = 100;
    }*/

    for (var i=0; i<conditions.length; i++) {
        var adjustHealth = conditions[i].adjustHealth;
        for (var j=0; j<adjustHealth.length; j++) {
            var cond = adjustHealth[j];
            if (cond && cond.healthAbbr == abbr) {
                adjust.control = (cond.control != "default") ? cond.control : adjust.control;
                adjust.steps += cond.adjustSteps;
                adjust.value += cond.adjustValue;
                //adjust.lower *= parseFloat(cond.lowerHealthRange / 100);
                //adjust.upper *= parseFloat(cond.upperHealthRange / 100);
                if (cond.immune) adjust.immune = true;
            }
        }
    }
}

// Get health adjustments
Game_Battler.prototype.getHealthAdjustments = function (healthAdj, adjust) {
    var self = this;
    if (!FROG.Core.isEmpty(healthAdj) && !FROG.Core.isEmpty(adjust)) {
        if (this.isActor()) {
            // Actor
            if (healthAdj.actor && healthAdj.actor.length) {
                var config = healthAdj.actor.filter(function(cfg) {
                    return cfg.actorId == self.actorId();
                })[0] || null;
                this.healthStatesAdjust(adjust, config);
            }

            // Class
            if (healthAdj.class && healthAdj.class.length) {
                var config = healthAdj.class.filter(function(cfg) {
                    return cfg.classId == self._classId;
                })[0] || null;
                this.healthStatesAdjust(adjust, config);
            }

            // Race
            if (Imported.FROG_Races === true && healthAdj.race && healthAdj.race.length) {
                var config = healthAdj.race.filter(function(cfg) {
                    return cfg.raceId == self.raceId();
                })[0] || null;
                this.healthStatesAdjust(adjust, config);
            }

            // Item
            if (healthAdj.item && healthAdj.item.length) {
                for (var i=0; i<healthAdj.item.length; i++) {
                    var config = healthAdj.item[i];
                    if ($gameParty._items[config.itemId] > 0) {
                        this.healthStatesAdjust(adjust, config);
                    }
                }
            }

            // Equipment
            if ((healthAdj.weapon && healthAdj.weapon.length) || (healthAdj.armor && healthAdj.armor.length)) {
                for (var i=0; i<this._equips.length; i++) {
                    var equip = this._equips[i];
                    if (equip && parseInt(equip._itemId) > 0) {
                        var config = null;
                        switch (equip._dataClass.toLowerCase()) {
                            case "weapon":
                                config = healthAdj.weapon.filter(function(cfg) {
                                    return cfg.weaponId == equip._itemId;
                                })[0] || null;
                                break;
                            case "armor":
                                config = healthAdj.armor.filter(function(cfg) {
                                    return cfg.armorId == equip._itemId;
                                })[0] || null;
                                break;
                        }

                        if (config) {
                            this.healthStatesAdjust(adjust, config);
                        }
                    }
                }
            }
        }
        else {
            // Enemy
            if (healthAdj.enemy && healthAdj.enemy.length) {
                var config = healthAdj.enemy.filter(function(cfg) {
                    return cfg.enemyId == self._enemyId;
                })[0] || null;
                this.healthStatesAdjust(adjust, config);
            }
        }

        // State
        if (healthAdj.state && healthAdj.state.length) {
            for (var i=0; i<healthAdj.state.length; i++) {
                var config = healthAdj.state[i];
                if (this.isStateAffected(config.stateId)) {
                    this.healthStatesAdjust(adjust, config);
                }
            }
        }
    }
}

// Adjust steps, value and immune
Game_Battler.prototype.healthStatesAdjust = function (adjust, config) {
    if (!FROG.Core.isEmpty(config) && !FROG.Core.isEmpty(adjust)) {
        adjust.steps += config.steps || 0;
        adjust.value += config.value || 0;
        adjust.addPercentage *= (config.addPercentage / 100);
        adjust.removePercentage *= (config.removePercentage / 100);
        if (config.immune) adjust.immune = true;
        if (config.visible === false) adjust.visible = false;
    }
}

// Apply states for HP and MP
Game_Battler.prototype.normalHealthStates = function () {
    if (FROG.Core.isEmpty($dataHealth.basicStateManagement)) return;
    var bsm = $dataHealth.basicStateManagement;

    // HP States
    for (var i=0; i<bsm.hpStateManagement.length; i++) {
        var state = bsm.hpStateManagement[i];
        this.manageHealthState(state, this.hp, this.mhp);
    }

    // MP States
    for (var i=0; i<bsm.mpStateManagement.length; i++) {
        var state = bsm.mpStateManagement[i];
        this.manageHealthState(state, this.mp, this.mmp);
    }

    // TP States
    if (this.isActor()) {
        for (var i=0; i<bsm.tpStateManagement.length; i++) {
            var state = bsm.tpStateManagement[i];
            this.manageHealthState(state, this.tp, 100);
        }
    }
}

// Add and remove Health States
Game_Battler.prototype.manageHealthState = function (state, hp, pctMaxHP, adjust) {
    if (!state.stateId) return;

    var minHP = state.minHP;
    var maxHP = state.maxHP;
    if (state.type == "PCT") {
        minHP = parseInt((state.minHP / 100) * pctMaxHP);
        maxHP = parseInt((state.maxHP / 100) * pctMaxHP);
    }

    if (!adjust) {
        var adjust = {
            addPercentage: 100,
            removePercentage: 100
        }
    }

    var addRate = (state.addPercentage / 100) * (adjust.addPercentage / 100);
    var remRate = (state.removePercentage / 100) * (adjust.removePercentage / 100);

    // Remove State - Don't remove death state
    if (state.stateId !== 1 && (hp < parseInt(minHP) || hp > parseInt(maxHP)) && this.isStateAffected(state.stateId)) {
        // Calculate odds that state is removed
        var chance = Math.random().toFixed(8);
        if (chance <= remRate) {
            var stateData = $dataStates[state.stateId];
            if (this._actorId && state.alertWhenRemoved && stateData && stateData.message4 && $gameParty._healthAlert.indexOf(this._name + stateData.message4) == -1) {
                $gameParty._healthAlert += this._name + stateData.message4 + '\n';
            }
            this.removeState(state.stateId);
        }
    }

    // Add State
    if (!adjust.immune && hp >= parseInt(minHP) && hp <= parseInt(maxHP)) {
        if (!this.isStateAffected(state.stateId)) {
            // Calculate odds that state applies
            var chance = Math.random().toFixed(8);
            if (chance <= addRate) {
                var stateData = $dataStates[state.stateId];
                if (this._actorId && state.alertWhenAdded && stateData && stateData.message1 && $gameParty._healthAlert.indexOf(this._name + stateData.message1) == -1) {
                    $gameParty._healthAlert += this._name + stateData.message1 + '\n';
                }
                this.addState(parseInt(state.stateId));
            }
        }
    }
}

/* ---------------------------------------------------------------*\
                        Game Action
\* -------------------------------------------------------------- */

// Make sure item is usable when the Health meta tag is present.
FROG.Health.Game_Action_HasItemAnyValidEffects = Game_Action.prototype.hasItemAnyValidEffects;
Game_Action.prototype.hasItemAnyValidEffects = function(target, effect) {
    var bOk = FROG.Health.Game_Action_HasItemAnyValidEffects.call(this, target, effect);
    if (bOk === false) {
        var item = this.item();
        var formula = (item && item.damage) ? item.damage.formula : "";
        if (formula.charAt(0) === "'" || formula.charAt(0) === '"') {
            bOk = true;
        }
    }
    return bOk;
}

FROG.Health.Game_Action_ExecuteHpDamage = Game_Action.prototype.executeHpDamage;
Game_Action.prototype.executeHpDamage = function(target, value) {
    FROG.Health.Game_Action_ExecuteHpDamage.call(this, target, value);
    value = value || 0;

    if (value === 0) {
        target.result().hpAffected = false;
        this.executeHealthDamage(target, value);
    }
}

// Handle Health Damage
Game_Action.prototype.executeHealthDamage = function(target, value) {
    try {
        var item = this.item();
        var a = this.subject();
        var b = target;
        var sign = ([3, 4].contains(item.damage.type) ? -1 : 1);
        var formulaBox = item.damage.formula;

        if (formulaBox.charAt(0) === "'" || formulaBox.charAt(0) === '"') {
            formulaBox = formulaBox.slice(1, -1);
            var formulaConfig = $dataHealth.formulaConfig.filter(function (config) {
                return formulaBox.toLowerCase() == config.name.toLowerCase() && config.damage && config.damage.length;
            })[0] || [];

            if (!FROG.Core.isEmpty(formulaConfig)) {
                var damageArr = formulaConfig.damage;

                for (var i=0; i<damageArr.length; i++) {
                    var damage = damageArr[i];
                    if (damage.healthAbbr && damage.formula) {
                        var result = target.result();
                        value = Math.max(eval(damage.formula), damage.min1Damage) * sign;
                        value = this.makeHealthDamageValue(target, value);
                        if (damage.flipDamage) value = value * -1;
                        target.gainHealth(this.healthDamageAbbr(damage.healthAbbr), value * -1, damage.showDamage);
                    }
                }
            }
        }
    }
    catch (e) {

    }
}

Game_Action.prototype.healthDamageAbbr = function(healthAbbr) {
    if (healthAbbr.indexOf(",") === -1) return healthAbbr.toLowerCase().trim();
    var abbrArr = healthAbbr.split(",");
    return abbrArr[FROG.Core.randomInt(0, abbrArr.length-1)];
}

// Make Health Damage Value
Game_Action.prototype.makeHealthDamageValue = function(target, value) {
    var item = this.item();
    var value = value * this.calcElementRate(target);
    if (this.isPhysical()) {
        value *= target.pdr;
    }
    if (this.isMagical()) {
        value *= target.mdr;
    }
    if (value < 0) {
        value *= target.rec;
    }
    if (this.critical) {
        value = this.applyCritical(value);
    }
    value = this.applyVariance(value, item.damage.variance);
    value = this.applyGuard(value, target);
    value = Math.round(value);
    return value;
}

/* ---------------------------------------------------------------*\
                        Game Action Result
\* -------------------------------------------------------------- */

FROG.Health.Game_ActionResult_Clear = Game_ActionResult.prototype.clear;
Game_ActionResult.prototype.clear = function() {
    FROG.Health.Game_ActionResult_Clear.call(this);

    this.healthHpAffected = false;
    this.healthHpDamage = {
        hp: 0,
        mp: 0,
        show: ['hp', 'mp']
    }

    for (var i=0; i<$dataHealth.healthConfig.length; i++) {
        var health = $dataHealth.healthConfig[i];
        if (health.abbreviation) {
            this.healthHpDamage[health.abbreviation] = 0;
        }
    }
}

/* ---------------------------------------------------------------*\
                        Window Battle Log
\* -------------------------------------------------------------- */

FROG.Health.Window_BattleLog_DisplayDamage = Window_BattleLog.prototype.displayDamage;
Window_BattleLog.prototype.displayDamage = function(target) {
    FROG.Health.Window_BattleLog_DisplayDamage.call(this, target);

    if (!target.result().missed && !target.result().evaded) {
        this.displayHealthHpDamage(target);
    }
}

FROG.Health.Window_BattleLog_EndAction = Window_BattleLog.prototype.endAction;
Window_BattleLog.prototype.endAction = function(subject) {
    FROG.Health.Window_BattleLog_EndAction.call(this, subject);
    var scene_battle = (this.parent && this.parent.parent) ? this.parent.parent : null;
    if (scene_battle) {
        scene_battle.setHealthHpIndex(-1);
    }
}

// Display Health Damage
Window_BattleLog.prototype.displayHealthHpDamage = function(target) {
    var self = this;
    if (target.result().healthHpAffected) {
        var bNoDamage = true;
        var result = target.result();

        Object.keys(result.healthHpDamage).forEach(function(key, index) {
            var value = result.healthHpDamage[key];
            if (value && result.healthHpDamage.show.indexOf(key) > -1) {
                var healthConfig = $dataHealth.healthConfig.filter(function (config) {
                    return config.abbreviation.toLowerCase().trim() == key;
                })[0] || null;

                var showInBattleLog = (healthConfig) ? healthConfig.showInBattleLog : true;
                if (showInBattleLog) {
                    if (value > 0 && !target.result().drain) {
                        self.push('performDamage', target);
                    }

                    if (value < 0) {
                        self.push('performRecovery', target);
                    }

                    if (!(result.hpAffected && key.toLowerCase() == "hp")) {
                        self.push('addText', self.makeHealthHpDamageText(target, key));
                    }
                }

                bNoDamage = false;
            }
        });

        if (bNoDamage) {
            var fmt;
            fmt = target.isActor() ? TextManager.actorNoDamage : TextManager.enemyNoDamage;
            self.push('addText', fmt.format(target.name()));
        }
    }
}

// Make Health Damage Text
Window_BattleLog.prototype.makeHealthHpDamageText = function (target, key) {
    var result = target.result();
    var damage = result.healthHpDamage[key];
    var isActor = target.isActor();
    var fmt;
    if (damage > 0 && result.drain) {
        fmt = isActor ? $dataHealth.textManager.actorHealthDrain : $dataHealth.textManager.enemyHealthDrain;
        return fmt.format(target.name(), TextManager.hp, damage);
    }
    else if (damage > 0) {
        fmt = isActor ? $dataHealth.textManager.actorHealthDamage : $dataHealth.textManager.enemyHealthDamage;
        return fmt.format(target.name(), damage, key);
    }
    else if (damage < 0) {
        fmt = isActor ? $dataHealth.textManager.actorHealthRecovery : $dataHealth.textManager.enemyHealthRecovery;
        return fmt.format(target.name(), -damage, key);
    }
    else {
        fmt = isActor ? TextManager.actorNoDamage : TextManager.enemyNoDamage;
        return fmt.format(target.name());
    }
}

// Custom Terms
if (FROG.Health.useCustomTerms === true) {
    Window_BattleLog.prototype.makeHpDamageText = function(target) {
        var term = FROG.Health.getCustomTerm(target, "hp", true);
        var result = target.result();
        var damage = result.hpDamage;
        var isActor = target.isActor();
        var fmt;
        if (damage > 0 && result.drain) {
            fmt = isActor ? TextManager.actorDrain : TextManager.enemyDrain;
            return fmt.format(target.name(), term, damage);
        } else if (damage > 0) {
            fmt = isActor ? TextManager.actorDamage : TextManager.enemyDamage;
            return fmt.format(target.name(), damage);
        } else if (damage < 0) {
            fmt = isActor ? TextManager.actorRecovery : TextManager.enemyRecovery;
            return fmt.format(target.name(), term, -damage);
        } else {
            fmt = isActor ? TextManager.actorNoDamage : TextManager.enemyNoDamage;
            return fmt.format(target.name());
        }
    }

    Window_BattleLog.prototype.makeMpDamageText = function(target) {
        var term = FROG.Health.getCustomTerm(target, "mp", true);
        var result = target.result();
        var damage = result.mpDamage;
        var isActor = target.isActor();
        var fmt;
        if (damage > 0 && result.drain) {
            fmt = isActor ? TextManager.actorDrain : TextManager.enemyDrain;
            return fmt.format(target.name(), term, damage);
        } else if (damage > 0) {
            fmt = isActor ? TextManager.actorLoss : TextManager.enemyLoss;
            return fmt.format(target.name(), term, damage);
        } else if (damage < 0) {
            fmt = isActor ? TextManager.actorRecovery : TextManager.enemyRecovery;
            return fmt.format(target.name(), term, -damage);
        } else {
            return '';
        }
    }

    Window_BattleLog.prototype.makeTpDamageText = function(target) {
        var term = FROG.Health.getCustomTerm(target, "tp", true);
        var result = target.result();
        var damage = result.tpDamage;
        var isActor = target.isActor();
        var fmt;
        if (damage > 0) {
            fmt = isActor ? TextManager.actorLoss : TextManager.enemyLoss;
            return fmt.format(target.name(), term, damage);
        } else if (damage < 0) {
            fmt = isActor ? TextManager.actorGain : TextManager.enemyGain;
            return fmt.format(target.name(), term, -damage);
        } else {
            return '';
        }
    }
}

/* ---------------------------------------------------------------*\
                        Sprite Battler
\* -------------------------------------------------------------- */

FROG.Health.Window_BattleEnemy_Select = Window_BattleEnemy.prototype.select;
Window_BattleEnemy.prototype.select = function(index) {
    FROG.Health.Window_BattleEnemy_Select.call(this, index);
    var scene_battle = (this.parent && this.parent.parent) ? this.parent.parent : null;
    if (scene_battle) {
        scene_battle.setHealthHpIndex(this.enemyIndex());
    }
}

/* ---------------------------------------------------------------*\
                        Scene Battle
\* -------------------------------------------------------------- */

FROG.Health.Scene_Battle_CreateAllWindows = Scene_Battle.prototype.createAllWindows;
Scene_Battle.prototype.createAllWindows = function() {
    FROG.Health.Scene_Battle_CreateAllWindows.call(this);
    this.setHealthHpIndex(-1);
    this._healthHpGaugeWindow = [];
    var enemies = this._enemyWindow._enemies || [];

    for (var i=0; i<enemies.length; i++) {
        var enemy = enemies[i];
        var w = ($dataHealth.battleConfig) ? $dataHealth.battleConfig.enemyGaugeWidth : 150;
        var h = ($dataHealth.healthConfig.length + 2) * 18;
        var x = (enemy._screenX - (w / 2));
        var y = enemy._screenY;
        this._healthHpGaugeWindow.push(new Window_HealthHpGauge(x, y, w, h, enemy));
    }

    for (var i=0; i<this._healthHpGaugeWindow.length; i++) {
        this.addWindow(this._healthHpGaugeWindow[i]);
    }
}

FROG.Health.Scene_Battle_Update = Scene_Battle.prototype.update;
Scene_Battle.prototype.update = function() {
    FROG.Health.Scene_Battle_Update.call(this);

    for (var i=0; i<this._healthHpGaugeWindow.length; i++) {
        if (i === this._healthHpIndex) {
            this._healthHpGaugeWindow[i].show();
        }
        else {
            this._healthHpGaugeWindow[i].hide();
            this._actorWindow.refresh();
            this._actorCommandWindow.refresh();
        }

        this._healthHpGaugeWindow[i].refresh();
    }
}

Scene_Battle.prototype.setHealthHpIndex = function(index) {
    if ($dataHealth.battleConfig.useEnemyHPGauge) {
        this._healthHpIndex = index;
    }
}

FROG.Health.Scene_Battle_SelectEnemySelection = Scene_Battle.prototype.selectEnemySelection;
Scene_Battle.prototype.selectEnemySelection = function() {
    FROG.Health.Scene_Battle_SelectEnemySelection.call(this);
    var index = this._enemyWindow.enemyIndex();
    this.setHealthHpIndex(index);
}

FROG.Health.Scene_Battle_OnEnemyCancel = Scene_Battle.prototype.onEnemyCancel;
Scene_Battle.prototype.onEnemyCancel = function() {
    this.setHealthHpIndex(-1);
    FROG.Health.Scene_Battle_OnEnemyCancel.call(this);
}

FROG.Health.Scene_Battle_StartActorCommandSelection = Scene_Battle.prototype.startActorCommandSelection;
Scene_Battle.prototype.startActorCommandSelection = function() {
    this.setHealthHpIndex(-1);
    FROG.Health.Scene_Battle_StartActorCommandSelection.call(this);
}

FROG.Health.Scene_Battle_UpdateBattleProcess = Scene_Battle.prototype.updateBattleProcess;
Scene_Battle.prototype.updateBattleProcess = function() {
    FROG.Health.Scene_Battle_UpdateBattleProcess.call(this);

    // Remove gauges when battle is won
    var bm = BattleManager;
    if (bm.isBattleEnd()) {
        this.setHealthHpIndex(-1);
    }

    // Display battle gauges
    if (!this.isAnyInputWindowActive() || bm.isAborting() || bm.isBattleEnd()) {
        if (!bm.updateEvent() && bm._targets.length > 0) {
            if (bm._phase == "action") {
                var targetIndex = bm._action._targetIndex;
                if (targetIndex > -1) {
                    var target = this._enemyWindow._enemies[targetIndex];
                    if (target && target.hp <= 0) {
                        var unit = bm._action.opponentsUnit();
                        var newTarget = unit.smoothTarget(this._targetIndex);
                        targetIndex = (newTarget) ? newTarget.index() : -1;
                    }
                }
                this.setHealthHpIndex(targetIndex);
            }
            else if (bm._phase == "turn") {
                this.setHealthHpIndex(-1);
            }
        }
    }
}

/* ---------------------------------------------------------------*\
                    Window Health HP Gauge
\* -------------------------------------------------------------- */

function Window_HealthHpGauge() {
    this.initialize.apply(this, arguments)
}

Window_HealthHpGauge.prototype = Object.create(Window_Selectable.prototype);
Window_HealthHpGauge.prototype.constructor = Window_HealthHpGauge;

Window_HealthHpGauge.prototype.initialize = function (x, y, width, height, enemy) {
    Window_Selectable.prototype.initialize.call(this, x, y, width, height);
    this.backOpacity = 0;
    this.opacity = 0;
    this.padding = 0;
    this._enemy = enemy;
    this._gindex = 0;
    this._trueWidth = width;
    this._trueHeight = this.contentsHeight() + 1;
    this.contents.resize(width, this._trueHeight);
    this.refresh();
    this.hide();
}

Window_HealthHpGauge.prototype.hide = function() {
    this._width = 0;
    this._height = 0;
}

Window_HealthHpGauge.prototype.show = function() {
    this._width = this._trueWidth;
    this._height = this._trueHeight;
}

Window_HealthHpGauge.prototype.contentsWidth = function() {
    return this.width;
}

Window_HealthHpGauge.prototype.lineHeight = function() {
    return 18;
}

Window_HealthHpGauge.prototype.maxItems = function() {
    return $dataHealth.healthConfig.length + 2;
}

Window_HealthHpGauge.prototype.maxVisibleItems = function() {
    if (!this._enemy) return 0;
    var self = this;
    var n = 1;                      // HP
    if (this._enemy.mmp > 0) n++;   // MP

    // Health HP
    Object.keys(this._enemy._health).forEach(function(key, index) {
        var health = self._enemy._health[key];
        if (health && !health.immune) {
            n++;
        }
    });

    return n;
}

Window_HealthHpGauge.prototype.maxPageRows = function() {
    return this.maxItems();
}

Window_HealthHpGauge.prototype.contentsHeight = function() {
    return this.lineHeight() * this.maxVisibleItems();
}

Window_HealthHpGauge.prototype.contentsWidth = function() {
    return this.width;
}

Window_HealthHpGauge.prototype.topRow = function() {
    return 0;
}

Window_HealthHpGauge.prototype.itemRect = function(index) {
    var lastGauge = (this._gindex == this.maxVisibleItems() - 1);
    var rect = new Rectangle();
    rect.width = this.width;
    rect.height = this.lineHeight();
    rect.x = 0;
    rect.y = rect.height * index;
    if (lastGauge) rect.height += 1;
    return rect;
}

Window_HealthHpGauge.prototype.refresh = function() {
    if (this.contents && this._enemy) {
        this.contents.clear();
        this.drawAllItems();
    }
}

Window_HealthHpGauge.prototype.drawAllItems = function() {
    for (var i=0; i<this.maxItems(); i++) {
        this.drawItem(i);
    }
}

Window_HealthHpGauge.prototype.drawItem = function (index) {
    if (!this._enemy) return;
    var enemy = this._enemy;

    // HP
    if (index === 0) {
        this._gindex = 0;
        var value = enemy.hp;
        var rate = parseFloat(value / enemy.mhp).toFixed(2);
        var term = FROG.Health.getCustomTerm(enemy, "hp", false);
        this.drawHealth(term.toUpperCase(), value, rate, index);
    }
    // MP
    else if (index === 1) {
        var value = enemy.mp;
        var rate = parseFloat(value / enemy.mmp).toFixed(2);
        var term = FROG.Health.getCustomTerm(enemy, "mp", false);
        this.drawHealth(term.toUpperCase(), value, rate, index);
    }
    // Health
    else {
        var healthConfig = enemy._health;
        var abbrArr = FROG.Core.getProp($dataHealth.healthConfig, "abbreviation") || [];
        var abbr = abbrArr[index - 2] || "";
        var health = healthConfig[abbr] || {};

        if (!health.immune) {
            var value = health.hp || 0;
            var rate = parseFloat(value / enemy.getHealthMhp(abbr)).toFixed(2) || 0;
            this.drawHealth(abbr, value, rate, index);
        }
    }
}

Window_HealthHpGauge.prototype.drawHealth = function (abbr, value, rate, index) {
    var rect = this.itemRect(this._gindex);
    var fillW = Math.floor(rect.width * rate);
    if (!isNaN(fillW)) {
        // Draw Gauge
        var lastGauge = (this._gindex == this.maxVisibleItems() - 1);
        var color1, color2;
        if (index === 0) {
            color1 = this.hpGaugeColor1();
            color2 = this.hpGaugeColor2();
        }
        else if (index === 1) {
            color1 = this.mpGaugeColor1();
            color2 = this.mpGaugeColor2();
        }
        else {
            var color1 = $dataHealth.healthConfig[index - 2].battleGaugeColor.startColor;
            var color2 = $dataHealth.healthConfig[index - 2].battleGaugeColor.endColor;
        }
        this.contents.fontSize = 15;
        this.contents.fillRect(rect.x, rect.y, rect.width, rect.height, this.gaugeBackColor());
        this.contents.gradientFillRect(rect.x + 1, rect.y + 1, fillW - 2, rect.height - (lastGauge ? 2 : 1), color1, color2);

        // Draw text
        this.drawText(abbr.toUpperCase(), rect.x + 5, rect.y + 5, rect.width * 0.5, "left");
        this.drawText(value.toString(), rect.x + rect.width * 0.5 - 5, rect.y + 5, rect.width * 0.5, "right");

        this._gindex++;
    }
}

Window_HealthHpGauge.prototype.drawText = function(text, x, y, maxWidth, align) {
    this.contents.drawText(text, x, y, maxWidth, 10, align);
}

/* ---------------------------------------------------------------*\
                            Window Base
\* -------------------------------------------------------------- */

// Custom Actor Terms
if (FROG.Health.useCustomTerms === true) {
    Window_Base.prototype.drawActorHp = function(actor, x, y, width) {
        width = width || 186;
        var term = FROG.Health.getCustomTerm(actor, "hp", false);
        var color1 = this.hpGaugeColor1();
        var color2 = this.hpGaugeColor2();
        this.drawGauge(x, y, width, actor.hpRate(), color1, color2);
        this.changeTextColor(this.systemColor());
        this.drawText(term, x, y, 44);
        this.drawCurrentAndMax(actor.hp, actor.mhp, x, y, width, this.hpColor(actor), this.normalColor());
    }

    Window_Base.prototype.drawActorMp = function(actor, x, y, width) {
        width = width || 186;
        var term = FROG.Health.getCustomTerm(actor, "mp", false);
        var color1 = this.mpGaugeColor1();
        var color2 = this.mpGaugeColor2();
        this.drawGauge(x, y, width, actor.mpRate(), color1, color2);
        this.changeTextColor(this.systemColor());
        this.drawText(term, x, y, 44);
        this.drawCurrentAndMax(actor.mp, actor.mmp, x, y, width, this.mpColor(actor), this.normalColor());
    }

    Window_Base.prototype.drawActorTp = function(actor, x, y, width) {
        width = width || 96;
        var term = FROG.Health.getCustomTerm(actor, "tp", false);
        var color1 = this.tpGaugeColor1();
        var color2 = this.tpGaugeColor2();
        this.drawGauge(x, y, width, actor.tpRate(), color1, color2);
        this.changeTextColor(this.systemColor());
        this.drawText(term, x, y, 44);
        this.changeTextColor(this.tpColor(actor));
        this.drawText(actor.tp, x + width - 64, y, 64, 'right');
    }
}

/* ---------------------------------------------------------------*\
                        Window BattleStatus
\* -------------------------------------------------------------- */

var ccc = 0;
if (FROG.Health.useHealthBattleStatus === true) {
    Window_BattleStatus.prototype.initialize = function() {
        var width = this.windowWidth();
        var height = this.windowHeight();
        var x = Graphics.boxWidth - width;
        var y = Graphics.boxHeight - height;
        Window_Selectable.prototype.initialize.call(this, x, y, width, height);
        this._config = ($dataHealth.battleConfig && $dataHealth.battleConfig.battleStatusConfig) ? $dataHealth.battleConfig.battleStatusConfig : {};
        this.refresh();
        this.openness = 0;
    }

    Window_BattleStatus.prototype.maxCols = function() {
        return 4;
    }

    Window_BattleStatus.prototype.spacing = function() {
        return 12;
    }

    Window_BattleStatus.prototype.itemHeight = function() {
        return this.lineHeight() * this.numVisibleRows();
    }

    Window_BattleStatus.prototype.itemWidth = function() {
        return Math.floor((this.width - this.padding * 2 + this.spacing()) / this.maxCols() - this.spacing());
    }

    Window_BattleStatus.prototype.maxItems = function() {
        return $gameParty.battleMembers().length;
    }

    Window_BattleStatus.prototype.gaugeRows = function() {
        return this._config.gaugeRows || 5;
    }

    Window_BattleStatus.prototype.gaugeCols = function() {
        return this._config.gaugeColumns || 2;
    }

    Window_BattleStatus.prototype.gaugeAreaHeight = function() {
        return this.itemHeight() - this.faceHeight();
    }

    Window_BattleStatus.prototype.gaugeHeight = function() {
        return this.gaugeAreaHeight() / this.gaugeRows();
    }

    Window_BattleStatus.prototype.gaugeWidth = function() {
        return this.itemWidth() / this.gaugeCols();
    }

    Window_BattleStatus.prototype.faceHeight = function() {
        return this._config.actorFaceHeight || 60;
    }

    Window_BattleStatus.prototype.gaugeFontSize = function() {
        return this._config.fontSize || 12;
    }

    Window_BattleStatus.prototype.leftPadding = function() {
        return this._config.nameLeftPadding || 1;
    }

    Window_BattleStatus.prototype.rightPadding = function() {
        return this._config.valueRightPadding || 6;
    }

    Window_BattleStatus.prototype.topPadding = function() {
        return this._config.topPadding || 0;
    }

    Window_BattleStatus.prototype.refresh = function() {
        this.contents.clear();
        this.drawAllItems();
        ccc = ccc + 1;
    }

    Window_BattleStatus.prototype.drawAllItems = function() {
        for (var i=0; i<this.maxItems(); i++) {
            this.drawItem(i);
        }
    }

    Window_BattleStatus.prototype.drawItem = function(index) {
        var actor = $gameParty.battleMembers()[index];
        this.drawFaceArea(index);
        this.drawGaugeArea(index);
    }

    Window_BattleStatus.prototype.drawFaceArea = function(index) {
        var actor = $gameParty.battleMembers()[index];
        var rect = this.itemRectForText(index);
        this.drawActorFace(actor, rect.x, rect.y, rect.width, this.faceHeight());
        this.drawActorIcons(actor, rect.x, this.faceHeight() - Window_Base._iconHeight - 3, rect.width);
    }

    Window_BattleStatus.prototype.drawActorIcons = function(actor, x, y, width) {
        width = this.itemWidth();
        var icons = actor.allIcons().slice(0, Math.floor(width / Window_Base._iconWidth));
        for (var i=0; i<icons.length; i++) {
            this.drawIcon(icons[i], x + Window_Base._iconWidth * i, y + 2);
        }
    }

    Window_BattleStatus.prototype.drawIcon = function(iconIndex, x, y) {
        var bitmap = ImageManager.loadSystem('IconSet');
        var pw = Window_Base._iconWidth;
        var ph = Window_Base._iconHeight;
        var sx = iconIndex % 16 * pw;
        var sy = Math.floor(iconIndex / 16) * ph;
        this.contents.blt(bitmap, sx, sy, pw, ph, x, y);
    }

    Window_BattleStatus.prototype.drawGaugeArea = function (index) {
        var actor = $gameParty.battleMembers()[index];
        var row = 0;
        var col = 0;

        for (var i=0; i<this._config.gauges.length; i++) {
            var gauge = this._config.gauges[i];
            if (gauge && gauge.healthAbbr) {
                var abbr = gauge.healthAbbr.toLowerCase().trim();
                var colSpan = gauge.columns;
                var rect = this.itemRectForGauge(index, row, col, colSpan);
                var color = this.getGaugeColors(abbr);
                var visible = true;

                if (abbr == "hp") {
                    var hp = actor.hp;
                    var mhp = actor.mhp;
                    var term = FROG.Health.getCustomTerm(actor, "hp", false);
                }
                else if (abbr == "mp") {
                    var hp = actor.mp;
                    var mhp = actor.mmp;
                    var term = FROG.Health.getCustomTerm(actor, "mp", false);
                }
                else if (abbr == "tp") {
                    var hp = actor.tp;
                    var mhp = 100;
                    var term = FROG.Health.getCustomTerm(actor, "tp", false);
                }
                else {
                    var actorHealth = actor.getHealth(abbr);
                    var hp = actorHealth.hp;
                    var mhp = actor.getHealthMhp(abbr);
                    var term = abbr;
                    visible = actor.isHealthVisible(abbr);
                }

                if (visible) {
                    var rate = parseFloat(hp / mhp).toFixed(3);
                    this.contents.fontSize = this.gaugeFontSize();
                    this.drawGauge(rect.x, rect.y, rect.width, rect.height, rate, color[0], color[1]);

                    if (gauge.showName) {
                        this.drawText(term.toUpperCase(), rect.x+this.leftPadding(), rect.y+this.topPadding(), rect.width-this.leftPadding(), rect.height-this.topPadding(), "left");
                    }

                    if (gauge.showValue) {
                        this.drawText(hp, rect.x, rect.y+this.topPadding(), rect.width-this.rightPadding(), rect.height-this.topPadding(), "right");
                    }

                    col += colSpan;
                    if (col >= this.gaugeCols()) {
                        row++;
                        col = 0;
                    }
                }
            }
        }
    }

    Window_BattleStatus.prototype.drawText = function(text, x, y, width, height, align) {
        this.contents.drawText(text, x+3, y, width, height, align);
    }

    Window_BattleStatus.prototype.getGaugeColors = function (abbr) {
        abbr = (abbr) ? abbr.toLowerCase().trim() : "";
        if (abbr) {
            if (abbr == "hp") {
                return [this.hpGaugeColor1(), this.hpGaugeColor2()];
            }
            else if (abbr == "mp") {
                return [this.mpGaugeColor1(), this.mpGaugeColor2()];
            }
            else if (abbr == "tp") {
                return [this.tpGaugeColor1(), this.tpGaugeColor2()];
            }
            else {
                var health = $dataHealth.healthConfig.filter(function (config) {
                    return config.abbreviation.toLowerCase().trim() == abbr.toLowerCase().trim();
                })[0] || null;

                if (health && health.battleGaugeColor && health.battleGaugeColor.startColor && health.battleGaugeColor.endColor) {
                    return [health.battleGaugeColor.startColor, health.battleGaugeColor.endColor];
                }
                else {
                    return [FROG.Core.badGaugeStartColor, FROG.Core.badGaugeEndColor];
                }
            }
        }
    }

    Window_BattleStatus.prototype.itemRectForGauge = function(index, row, col, colSpan) {
        var rect = this.itemRect(index);
        rect.width = this.gaugeWidth() * colSpan;
        rect.height = this.gaugeHeight();
        rect.x = rect.x + (col * this.gaugeWidth());
        rect.y = this.faceHeight() + (row * this.gaugeHeight());
        return rect;
    }

    Window_BattleStatus.prototype.drawGauge = function(x, y, width, height, rate, color1, color2) {
        var fillW = Math.floor(width * rate);
        if (!isNaN(fillW)) {
            this.contents.fillRect(x, y, width, height, this.gaugeBackColor());
            this.contents.gradientFillRect(x+1, y+1, fillW-2, height-2, color1, color2);
        }
    }
}

/* ---------------------------------------------------------------*\
                        Window Status
\* -------------------------------------------------------------- */

Window_Status.prototype.drawBlock1 = function(y) {
    var width = parseInt(Graphics.boxWidth / 4);
    this.drawActorName(this._actor, 0, y);
    this.drawActorClass(this._actor, width, y);
    if (Imported.FROG_Races === true && $dataHealth.statusWindow && $dataHealth.statusWindow.displayRace) {
        this.drawActorRace(this._actor, width * 2, y);
    }
    else {
        this.drawActorNickname(this._actor, width * 2, y);
    }

    // Draw Condition Icons
    var condIconIds = FROG.Core.getProp($gameParty._healthConditions, "iconId");
    for (var i=0; i<condIconIds.length; i++) {
        this.drawIcon(condIconIds[i], width * 3 + Window_Base._iconWidth * i, y);
    }
}

Window_Base.prototype.drawActorRace = function(actor, x, y, width) {
    if (FROG.Core.isEmpty(actor) || FROG.Core.isEmpty(actor._race)) return;
    width = width || 168;
    this.changeTextColor(this.hpColor(actor));
    this.drawText(FROG.Races.getName(actor.actorId()), x, y, width);
}

Window_Status.prototype.drawBlock3 = function (y) {
    var arrParty = $gameParty._actors.slice(0, $dataHealth.limitPartySize);
    if (arrParty.indexOf(this._actor.actorId()) > -1) {
        var padding = 15;
        var width = parseInt(this.contentsWidth() / 3);
        var x = 0;

        for (var i=1; i<=3; i++) {
            var column = $dataHealth.statusWindow["column" + i];
            var healthStats = $dataHealth.statusWindow["healthStats" + i];

            switch (column) {
                case "Attributes":
                    this.drawParameters(x + padding, y, width - (padding * 2));
                    break;
                case "Health Stats":
                    this.drawHealth(x + padding, y, width - (padding * 2), healthStats);
                    break;
                case "Equipment":
                    this.drawEquipments(x + padding, y, width);
                    break;
            }

            if (i < 3) {
                x += width;
            }
        }
    }
    else {
        var padding = 50;
        var width = parseInt((Graphics.boxWidth - padding * 2) / 2);
        this.drawParameters(0, y, width);
        this.drawEquipments(padding + width, y);
    }
}

Window_Status.prototype.drawBlock4 = function(y) {
    this.drawProfile(6, y);
}

Window_Status.prototype.drawParameters = function(x, y, width) {
    var lineHeight = this.lineHeight();
    var maxParam = 0;
    for (var i=2; i<8; i++) {
        if (this._actor.param(i) > maxParam) {
            maxParam = this._actor.param(i);
        }
    }

    for (var i=0; i<6; i++) {
        var paramId = i + 2;
        var y2 = y + lineHeight * i;
        var rate = (this._actor.param(paramId) / maxParam).toFixed(2);
        var textWidth = parseInt(width * 0.7);
        var valueWidth = parseInt(width - textWidth);
        var gaugeColor = FROG.Health.getColor($dataHealth.colorConfig.attributes, rate);

        this.drawGauge(x, y2, width, rate, gaugeColor[0], gaugeColor[1]);
        this.changeTextColor(this.systemColor());
        this.drawText(TextManager.param(paramId), x, y2, textWidth, "left");
        this.resetTextColor();
        this.drawText(this._actor.param(paramId), x + textWidth, y2, valueWidth, "right");
    }
}

// Returns the start and end colors for a gauge
FROG.Health.getColor = function (colorObj, rate) {
    if (colorObj && !isNaN(rate)) {
        for (var i=0; i<colorObj.length; i++) {
            var c = colorObj[i];
            if (c && c.startColor && c.endColor && rate >= c.minPercent / 100 && rate <= c.maxPercent / 100) {
                return [c.startColor, c.endColor];
            }
        }
    }
    return [FROG.Core.badGaugeStartColor, FROG.Core.badGaugeEndColor];
}

Window_Status.prototype.drawEquipments = function(x, y, width) {
    var equips = this._actor.equips();
    var count = Math.min(equips.length, this.maxEquipmentLines());
    for (var i=0; i<count; i++) {
        this.drawItemName(equips[i], x, y + this.lineHeight() * i, width);
    }
}

Window_Status.prototype.drawHealth = function(x, y, width, healthStats) {
    var self = this;
    var i = 0;

    for (var j=0; j<healthStats.length; j++) {
        var abbr = healthStats[j];
        var y2 = y + self.lineHeight() * i;
        var actor = self._actor;
        var health = actor.getHealth(abbr);

        if (health) {
            var hp = parseInt(health.hp) || 0;
            var mhp = parseInt(actor.getHealthMhp(abbr)) || 100;
            var rate = (hp / mhp).toFixed(2);
            var textWidth = parseInt(width * 0.6);
            var valueWidth = parseInt(width - textWidth);
            var gaugeColor = FROG.Health.getColor($dataHealth.colorConfig[health.control], rate);

            self.drawGauge(x, y2, width, rate, gaugeColor[0], gaugeColor[1]);
            self.changeTextColor(self.systemColor());
            self.drawText(health.name, x, y2, textWidth, "left");
            self.resetTextColor();
            if ($dataHealth.showMaxHealth === true) {
                self.drawText(hp + "/" + mhp, x + textWidth, y2, valueWidth, "right");
            }
            else {
                self.drawText(hp, x + textWidth, y2, valueWidth, "right");
            }
            i++;
        }
    }
}

/* ---------------------------------------------------------------*\
                        Script Calls
\* -------------------------------------------------------------- */

/** Get the curent health value for this aspect
 * @param {string} abbr - The abbreviation used to identify a health (required)
 * @returns {object} Returns health object
 */
Game_Battler.prototype.getHealth = function (abbr) {
    if (abbr && this._health && this._health[abbr]) {
        return this._health[abbr];
    }
    return {};
}
var c=0;
/** Get the maximum health value for this aspect
 * @param {string} abbr - The abbreviation used to identify a health (required)
 * @returns {number} Returns the max hp for the actor or enemy
 */
Game_Battler.prototype.getHealthMhp = function (abbr) {
    var self = this;
    var mhp = 0;

    if (abbr) {
        var health = $dataHealth.healthConfig.filter(function (config) {
            return config.abbreviation.toLowerCase().trim() == abbr.toLowerCase().trim();
        })[0] || null;

        // Starting MHP
        mhp = this.getHealth(abbr).mhp;

        // Is an Actor
        if (this._actorId > 0 && health && health.adjustments) {
            // Actor
            var actorAdjust = health.adjustments.actor.filter(function (config) {
                return config.actorId === self.actorId();
            })[0] || null;
            if (actorAdjust && actorAdjust.bonusPenalty) mhp += actorAdjust.bonusPenalty;

            // Class
            var classAdjust = health.adjustments.class.filter(function (config) {
                return config.classId === self._classId;
            })[0] || null;
            if (classAdjust && classAdjust.bonusPenalty) mhp += classAdjust.bonusPenalty;

            // Race
            if (Imported.FROG_Races === true) {
                var raceAdjust = health.adjustments.race.filter(function (config) {
                    return config.raceId === self.raceId();
                })[0] || null;
                if (raceAdjust && raceAdjust.bonusPenalty) mhp += raceAdjust.bonusPenalty;
            }

            // Item
            if (health.adjustments.item && health.adjustments.item.length) {
                for (var i=0; i<health.adjustments.item.length; i++) {
                    var itemAdjust = health.adjustments.item[i];
                    if ($gameParty._items[itemAdjust.itemId] > 0 && itemAdjust.bonusPenalty) {
                        mhp += itemAdjust.bonusPenalty;
                    }
                }
            }

            // Equipment
            if ((health.adjustments.weapon && health.adjustments.weapon.length) || (health.adjustments.armor && health.adjustments.armor.length)) {
                for (var i=0; i<this._equips.length; i++) {
                    var equip = this._equips[i];
                    if (equip && parseInt(equip._itemId) > 0) {
                        var equipAdjust = null;
                        switch (equip._dataClass.toLowerCase()) {
                            case "weapon":
                                equipAdjust = health.adjustments.weapon.filter(function(cfg) {
                                    return cfg.weaponId == equip._itemId;
                                })[0] || null;
                                break;
                            case "armor":
                                equipAdjust = health.adjustments.armor.filter(function(cfg) {
                                    return cfg.armorId == equip._itemId;
                                })[0] || null;
                                break;
                        }

                        if (equipAdjust && equipAdjust.bonusPenalty) {
                            mhp += equipAdjust.bonusPenalty;
                        }
                    }
                }
            }
        }

        // State
        if (health && health.adjustments && health.adjustments.state && health.adjustments.state.length) {
            for (var i=0; i<health.adjustments.state.length; i++) {
                var stateAdjust = health.adjustments.state[i];
                if (this.isStateAffected(stateAdjust.stateId) && stateAdjust.bonusPenalty) {
                    mhp += stateAdjust.bonusPenalty;
                }
            }
        }
    }

    // Reset hp if mhp drops below it
    if (this.getHealth(abbr).hp > mhp) {
        this.setHealth(abbr, { hp: mhp });
    }

    return mhp;
}

/** Get the visibility status for this aspect of health
 * @param {string} abbr - The abbreviation used to identify a health (required)
 * @returns {number} Returns the max hp for the actor or enemy
 */
Game_Battler.prototype.isHealthVisible = function (abbr) {
    var self = this;
    var bOk = true;
    if (abbr) {
        var health = $dataHealth.healthConfig.filter(function (config) {
            return config.abbreviation.toLowerCase().trim() == abbr.toLowerCase().trim();
        })[0] || null;

        if (health && health.adjustments) {
            // Actor
            var actorAdjust = health.adjustments.actor.filter(function (config) {
                return config.actorId === self.actorId();
            })[0] || null;
            if (actorAdjust && actorAdjust.visible === false) bOk = false;

            // Class
            var classAdjust = health.adjustments.class.filter(function (config) {
                return config.classId === self._classId;
            })[0] || null;
            if (classAdjust && classAdjust.visible === false) bOk = false;

            // Race
            if (Imported.FROG_Races === true) {
                var raceAdjust = health.adjustments.race.filter(function (config) {
                    return config.raceId === self.raceId();
                })[0] || null;
                if (raceAdjust && raceAdjust.visible === false) bOk = false;
            }
        }
    }

    return bOk;
}

/** Set the exact value for a specific aspect of health
 * @param {string} abbr - The abbreviation used to identify a health (required)
 * @param {object} object - Object that contains the properties to set (required)
 */
Game_Battler.prototype.setHealth = function (abbr, object) {
    if (!FROG.Core.isEmpty(object) && abbr) {
        var health = this._health[abbr] || {};
        if (!FROG.Core.isEmpty(health)) {
            Object.keys(object).forEach(function (key, index) {
                var value = object[key];
                if (value && value.toString().trim().slice(-1) === "%") {
                    value = parseInt(health.mhp * (parseInt(value) / 100)) || parseInt(value);
                }

                if (!isNaN(value)) {
                    health[key] = parseInt(value);
                }
            });
            health.hp = health.hp.clamp(0, this.getHealthMhp(abbr));
        }
    }
}

/** Sets health of all party members
 * @param {string} abbr - The abbreviation used to identify a health (required)
 * @param {object} object - Object that contains the properties to set (required)
 */
Game_Party.prototype.setHealth = function (abbr, object) {
    for (var i=0; i<this._actors.length; i++) {
        var actor = $gameActors.actor(this._actors[i]);
        if (actor) {
            actor.setHealth(abbr, object);
        }
    }
}

/** Adds to the value for a specific aspect of health
 * @param {string} abbr - The abbreviation used to identify a health (required)
 * @param {number or string} value - Number or a string of a number with a % at the end
 */
Game_Battler.prototype.gainHealth = function (abbr, value, show) {
    abbr = (abbr) ? abbr.toLowerCase().trim() : "";
    value = parseInt(value) || 0;

    if (abbr && isNaN(value) === false && this._health && (this._health[abbr] || abbr == "hp" || abbr == "mp")) {
        var vType = "number";
        if (value && value.toString().trim().slice(-1) === "%") {
            value = parseInt(value);
            vType = "percentage";
        }

        if (abbr == "hp") {
            if (vType == "percentage") {
                value = this.mhp * (value / 100);
            }

            if ($dataHealth.battleConfig.useDamagePopup) {
                this.gainHp(value);
            }
            else {
                this._result.hpDamage = value * -1;
                this.setHp(this.hp + value);
            }
        }
        else if (abbr == "mp") {
            if (vType == "percentage") {
                value = this.mmp * (value / 100);
            }

            if ($dataHealth.battleConfig.useDamagePopup) {
                this.gainMp(value);
            }
            else {
                this._result.mpDamage = value * -1;
                this.setMp(this.mp + value);
            }
        }
        else {
            var health = this.getHealth(abbr);
            var drainAbbr = health.drainAbbr || "";
            var mhp = this.getHealthMhp(abbr);
            if (vType == "percentage") {
                value = mhp * (value / 100);
            }

            // Drain from other health if this runs out
            if (drainAbbr) {
                var excessHP = 0;
                switch (health.control) {
                    case "decremental":
                        var excessHP = Math.max((health.hp + value) * -1, 0);
                        break;
                    case "incremental":
                        var excessHP = Math.max((health.hp + value) - mhp, 0);
                        break;
                }

                if (excessHP > 0) {
                    var control = this.getHealth(drainAbbr).control || "decremental";
                    switch (control) {
                        case "decremental": this.gainHealth(drainAbbr, excessHP * -1, show); break;
                        case "incremental": this.gainHealth(drainAbbr, excessHP, show); break;
                    }
                }
            }

            this.setHealth(abbr, { hp: health.hp + value });
        }
        this._result.healthHpAffected = true;
        this._result.healthHpDamage[abbr] = value * -1;
        if (show) {
            this._result.healthHpDamage['show'].push(abbr);
        }
        this.healthStates(false);
    }
}

/** Adds health to all party members
 * @param {string} abbr - The abbreviation used to identify a health (required)
 * @param {number or string} value - Number or a string of a number with a % at the end
 */
Game_Party.prototype.gainHealth = function (abbr, value) {
    for (var i=0; i<this._actors.length; i++) {
        var actor = $gameActors.actor(this._actors[i]);
        if (actor) {
            actor.gainHealth(abbr, value);
        }
    }
}

/** Test to see if condition is active
 * @param {string} condName - The name of the condition to set (required)
 * @returns {boolean}
 */
Game_Party.prototype.isConditionAffected = function (condName) {
    return $gameParty._healthConditions.filter(function (cond) {
        return cond.name.toLowerCase().trim() == condName.toLowerCase().trim();
    }).length > 0;
}

/** Set condition as active
 * @param {string} condName - The name of the condition to set (required)
 */
Game_Party.prototype.setHealthCondition = function (condName) {
    for (var i=0; i<$dataHealth.conditions.length; i++) {
        var cond = $dataHealth.conditions[i];
        if (!cond || !cond.name) continue;

        if (condName.toLowerCase() == cond.name.toLowerCase() && !$gameParty.isConditionAffected(cond.name)) {
            $gameParty._healthConditions.push(cond);
            if (cond.setCommonEvent > 0) {
                $gameTemp.reserveCommonEvent(cond.setCommonEvent);
            }
            break;
        }
    }
}

/** Removes an active condition
 * @param {string} condName - The name of the condition to remove (required)
 */
Game_Party.prototype.removeHealthCondition = function (condName) {
    condName = (condName) ? condName.toLowerCase().trim() : "";
    $gameParty._healthConditions = $gameParty._healthConditions.filter(function(cond) {
        cond.name = (cond.name) ? cond.name.toLowerCase().trim() : "";
        if (cond.removeCommonEvent > 0 && cond.name == condName) {
            $gameTemp.reserveCommonEvent(cond.removeCommonEvent);
        }
        return cond.name !== condName;
    });
}

/* ---------------------------------------------------------------*\
                        Plugin Commands
\* -------------------------------------------------------------- */

// Add new plugin commands
FROG.Health.Game_Interpreter_PluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function (command, args) {
    FROG.Health.Game_Interpreter_PluginCommand.call(this, command, args);

    if (command && args && args.length > 1 && command.trim().toUpperCase() == "HEALTH") {
        var formatArg = FROG.Core.formatArg;
        var pCommand = formatArg(args[0]).toUpperCase();

        switch (pCommand) {
            case "GETHP":
                var actorId = parseInt(formatArg(args[1])) || 0;
                var actor = $gameActors.actor(actorId);
                var abbr = formatArg(args[2]);
                var vid = parseInt(formatArg(args[3]));
                $gameVariables.setValue(vid, actor.getHealth(abbr).hp);
                break;

            case "GETMHP":
                var actorId = parseInt(formatArg(args[1])) || 0;
                var actor = $gameActors.actor(actorId);
                var abbr = formatArg(args[2]);
                var vid = parseInt(formatArg(args[3]));
                $gameVariables.setValue(vid, actor.getHealth(abbr).mhp);
                break;

            case "SETHP":
                var actorId = parseInt(formatArg(args[1])) || 0;
                var actor = $gameActors.actor(actorId);
                var abbr = formatArg(args[2]);
                var value = formatArg(args[3]);
                actor.setHealth(abbr, {hp: value});
                break;

            case "ADDHP":
                var actorId = parseInt(formatArg(args[1])) || 0;
                var actor = $gameActors.actor(actorId);
                var abbr = formatArg(args[2]);
                var value = formatArg(args[3]);
                actor.gainHealth(abbr, value);
                break;

            case "REMHP":
                var actorId = parseInt(formatArg(args[1])) || 0;
                var actor = $gameActors.actor(actorId);
                var abbr = formatArg(args[2]);
                var value = formatArg(args[3]);
                actor.gainHealth(abbr, value * -1);
                break;

            case "SETHPALL":
                var abbr = formatArg(args[1]);
                var value = formatArg(args[2]);
                $gameParty.setHealth(abbr, {hp: value});
                break;

            case "ADDHPALL":
                var abbr = formatArg(args[1]);
                var value = formatArg(args[2]);
                $gameParty.gainHealth(abbr, value);
                break;

            case "REMHPALL":
                var abbr = formatArg(args[1]);
                var value = formatArg(args[2]);
                $gameParty.gainHealth(abbr, value * -1);
                break;

            case "ISCONDACTIVE":
                var vid = parseInt(formatArg(args[2]));
                $gameSwitches.setValue(vid, $gameParty.isConditionAffected(args[1]));
                break;

            case "SETCOND":
                $gameParty.setHealthCondition(args[1]);
                break;

            case "REMCOND":
                $gameParty.removeHealthCondition(args[1]);
                break;
        }
    }
}

/** Gets custom term for actor, class or enemy
 * @param {object} battler - Game_Battler object (actor or enemy) Required
 * @param {string} abbr - Abbreviation to look up custom term (hp, mp or tp) Required
 * @param {boolean} returnFull - Return full name if true or abbreviated name when false
 * @returns Returns custom term in order found (Actor -> Class -> System) or (Enemy -> System)
 */
FROG.Health.getCustomTerm = function (battler, abbr, returnFull) {
    abbr = (abbr) ? abbr.toString().toLowerCase().trim() : "";
    if (!battler || !abbr || !(abbr == "hp" || abbr == "mp" || abbr == "tp")) return "ERR";

    // Get property name and default term from abbreviation
    var abbrProp = "";
    switch (abbr) {
        case "hp":
            if (returnFull) {
                term = TextManager.hp;
                abbrProp = "hPName";
            }
            else {
                term = TextManager.hpA;
                abbrProp = "hPAbbr";
            }
            break;
        case "mp":
            if (returnFull) {
                term = TextManager.mp;
                abbrProp = "mPName";
            }
            else {
                term = TextManager.mpA;
                abbrProp = "mPAbbr";
            }
            break;
        case "tp":
            if (returnFull) {
                term = TextManager.tp;
                abbrProp = "tPName";
            }
            else {
                term = TextManager.tpA;
                abbrProp = "tPAbbr";
            }
            break;
    }

    if (abbrProp) {
        if (battler._actorId) {
            var actorConfig = $dataHealth.actorConfig.filter(function (config) {
                return config.actorId == battler.actorId();
            })[0] || {};

            var classConfig = $dataHealth.classConfig.filter(function (config) {
                return config.classId == battler._classId;
            })[0] || {};

            if (!FROG.Core.isEmpty(actorConfig) && !FROG.Core.isEmpty(actorConfig.customTerms) && actorConfig.customTerms[abbrProp]) {
                term = actorConfig.customTerms[abbrProp];
            }
            else if (!FROG.Core.isEmpty(classConfig) && !FROG.Core.isEmpty(classConfig.customTerms) && classConfig.customTerms[abbrProp]) {
                term = classConfig.customTerms[abbrProp];
            }
        }
        else if (battler._enemyId) {
            var enemyConfig = $dataHealth.enemyConfig.filter(function (config) {
                return config.enemyId == battler._enemyId;
            })[0] || {};

            if (!FROG.Core.isEmpty(enemyConfig) && !FROG.Core.isEmpty(enemyConfig.customTerms) && enemyConfig.customTerms[abbrProp]) {
                term = enemyConfig.customTerms[abbrProp];
            }
        }
    }

    return term;
}
