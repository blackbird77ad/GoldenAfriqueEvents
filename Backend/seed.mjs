import 'dotenv/config';
import mongoose from 'mongoose';
import connectDB from './config/db.mjs';
import CateringItem from './Models/CateringItem.mjs';
import RentalItem from './Models/RentalItem.mjs';

const CATERING = [
  { name:'Jollof Rice',               category:'Main Dishes',       desc:'Classic smoky Ghanaian jollof rice',                     image:'/catering-services/jollof.png' },
  { name:'Banku',                      category:'Main Dishes',       desc:'Fermented corn & cassava dumplings',                     image:'/catering-services/banku.png' },
  { name:'Fufu & Light Soup',         category:'Main Dishes',       desc:'Pounded yam with aromatic light soup',                   image:'/catering-services/fufu-light-soup.jpg' },
  { name:'Waakye',                     category:'Main Dishes',       desc:'Rice & beans with full waakye setup',                    image:'/catering-services/Waakye-spaghetti-gari-salad.png' },
  { name:'Fried Rice & Chicken',      category:'Main Dishes',       desc:'Golden fried rice with grilled chicken',                 image:'/catering-services/fried-rice-chicken-shito.png' },
  { name:'Tuo Zaafi',                 category:'Main Dishes',       desc:'Northern Ghanaian TZ with soup',                        image:'/catering-services/Tuo-Zafi.png' },
  { name:'Okro Stew',                 category:'Main Dishes',       desc:'Rich Ghanaian okro stew',                               image:'/catering-services/okro-stew.png' },
  { name:'Light Soup',                category:'Main Dishes',       desc:'Spicy & fragrant light soup',                           image:'/catering-services/light-soup-scaled.jpg' },
  { name:'Grilled Tilapia',           category:'Proteins',          desc:'Whole grilled tilapia with shito',                      image:'/catering-services/tilipia.png' },
  { name:'Fried Chicken',             category:'Proteins',          desc:'Crispy seasoned fried chicken',                         image:'/catering-services/fried-chicken.png' },
  { name:'Kebab',                      category:'Proteins',          desc:'Skewered spiced meat kebab',                            image:'/catering-services/kebab.png' },
  { name:'Steak',                      category:'Proteins',          desc:'Grilled beef steak',                                    image:'/catering-services/steak.png' },
  { name:'Pork',                       category:'Proteins',          desc:'Seasoned roasted pork',                                 image:'/catering-services/delicious-pork-meat.jpg' },
  { name:'Party Fish',                category:'Proteins',          desc:'Party-style fried fish',                                image:'/catering-services/client-order-party-fish.png' },
  { name:'Bofrot (Puff Puff)',        category:'Snacks & Pastries', desc:'Light Ghanaian fried doughnuts',                        image:'/catering-services/fried-puff-puff-bofrot.png' },
  { name:'Spring Rolls',              category:'Snacks & Pastries', desc:'Crispy filled spring rolls',                            image:'/catering-services/party-spring-rolls.jpg' },
  { name:'Meat Pie',                  category:'Snacks & Pastries', desc:'Flaky pastry filled with spiced meat',                  image:'/catering-services/party-meat-pie.jpg' },
  { name:'Assorted Pastries',         category:'Snacks & Pastries', desc:'Mixed party pastries selection',                        image:'/catering-services/party-pastries.jpg' },
  { name:'Donuts',                     category:'Snacks & Pastries', desc:'Soft glazed donuts',                                    image:'/catering-services/pastries-donut.jpg' },
  { name:'Chips',                      category:'Snacks & Pastries', desc:'Crispy flour chips',                                    image:'/catering-services/party-flour-chips.jpg' },
  { name:'Sandwich',                  category:'Snacks & Pastries', desc:'Freshly made party sandwiches',                         image:'/catering-services/sandwich.webp' },
  { name:'Fried Yam & Shito',        category:'Sides',             desc:'Crispy fried yam with shito pepper',                   image:'/catering-services/Fried-yam-shito-red-pepper.png' },
  { name:'Fried Yam',                category:'Sides',             desc:'Plain crispy fried yam',                               image:'/catering-services/fried-yam.png' },
  { name:'Sobolo',                    category:'Drinks',            desc:'Chilled hibiscus drink',                               image:'/catering-services/Drink-sobolo.jpg' },
  { name:'Asana',                     category:'Drinks',            desc:'Traditional fermented corn drink',                     image:'/catering-services/Drink-asana.jpg' },
  { name:'Coconut Water',            category:'Drinks',            desc:'Fresh natural coconut water',                          image:'/catering-services/Drink-coconut.jpg' },
  { name:'Pitoo',                     category:'Drinks',            desc:'Northern Ghanaian millet beer',                        image:'/catering-services/Drink-pitoo.jpg' },
  { name:'Party Sobolo',             category:'Drinks',            desc:'Party-style sobolo mix',                               image:'/catering-services/Drink-party-sobolo.jpg' },
];

const RENTALS = [
  { name:'Crystal Chair',                category:'Chairs',                    desc:'Elegant transparent crystal chair',                image:'/Events-decor/crystal-chair.jpg' },
  { name:'Fan Back Gladiator Chair',     category:'Chairs',                    desc:'Classic fan back design',                          image:'/Events-decor/fanback-cladiator-chair.jpg' },
  { name:'Mesh Folding Chair',           category:'Chairs',                    desc:'Lightweight mesh folding chair',                   image:'/Events-decor/mesh-folding-chair.jpg' },
  { name:'Bridal High Chair',            category:'Chairs',                    desc:'Luxury high chair for bride & groom',              image:'/Events-decor/high-chairs-bridal.jpg' },
  { name:'Serpentine Throne Chair',      category:'Chairs',                    desc:'Royal serpentine throne set',                      image:'/Events-decor/serpentine-throne-table-chairs.jpg' },
  { name:'Round Wooden Table',           category:'Tables',                    desc:'Classic round wooden dining table',                image:'/Events-decor/round-wooden-table.jpg' },
  { name:'8ft Wooden Table',            category:'Tables',                    desc:'Long rectangular banquet table',                   image:'/Events-decor/wooden-table-8ft.jpg' },
  { name:'Cocktail Table',              category:'Tables',                    desc:'High cocktail / poseur table',                     image:'/Events-decor/cocktail-table.webp' },
  { name:'White Tablecloth',            category:'Table Covers & Linens',     desc:'Clean white rectangular tablecloth',               image:'/Events-decor/white-tablecloth.jpg' },
  { name:'White Rectangle Scuba Cover', category:'Table Covers & Linens',     desc:'Fitted scuba table cover',                         image:'/Events-decor/scuba-white-rectangle-tablecloth.jpg' },
  { name:'Table Skirt (Tutu)',          category:'Table Covers & Linens',     desc:'Elegant tutu-style table skirt',                   image:'/Events-decor/white-tu-tu-table-skirt.jpg' },
  { name:'Spandex Cover (Black)',        category:'Table Covers & Linens',     desc:'Stretch spandex table cover black',                image:'/Events-decor/spandex-cover-black.jpg' },
  { name:'Chair Bow / Sash',            category:'Chair Covers & Bows',       desc:'Decorative chair bow / sash',                      image:'/Events-decor/chair-bow.png' },
  { name:'Gold Celest Charger',         category:'Charger Plates',            desc:'Elegant gold charger plate',                       image:'/Events-decor/Gold-Celest-Charger.webp' },
  { name:'Starburst Glass Charger',     category:'Charger Plates',            desc:'Stunning starburst glass charger',                  image:'/Events-decor/Stuart-Chargers-StarburstGlasss.webp' },
  { name:'Full Charger Table Setup',    category:'Charger Plates',            desc:'Complete charger plate table setup',               image:'/Events-decor/charger-setup.png' },
  { name:'Golden Rim Plate',            category:'Plates & Bowls',            desc:'A la carte golden rim dinner plate',               image:'/Events-decor/ala-carte-golden-rim-plate.jpg' },
  { name:'Arcoroc Bowls',              category:'Plates & Bowls',            desc:'Clear glass serving bowls',                        image:'/Events-decor/arcoroc-bowls.webp' },
  { name:'Clear Glass Goblet',          category:'Glassware',                 desc:'Classic clear glass goblet',                       image:'/Events-decor/clear-glass-goblet.jpg' },
  { name:'Gold Rim Coupe Glass',        category:'Glassware',                 desc:'Gold rim coupe champagne glass',                   image:'/Events-decor/Gold-Rim-Coupe-Tabletop.webp' },
  { name:'Stemless Champagne Glass',    category:'Glassware',                 desc:'Modern stemless champagne flute',                  image:'/Events-decor/Libbey-Stemless-Champagne.webp' },
  { name:'Copper Flatware Set',         category:'Cutlery & Serving Utensils',desc:'Modern copper flatware cutlery set',               image:'/Events-decor/Mod-Copper-Flatware-cutlery.webp' },
  { name:'Stainless Ladles',           category:'Cutlery & Serving Utensils',desc:'Heavy duty stainless steel ladles',                image:'/Events-decor/Stainless-Ladles.webp' },
  { name:'Chafing Dish',               category:'Food Warmers & Chafing Dishes',desc:'Standard party chafing dish',                   image:'/Events-decor/chaffin-Dish.jpg' },
  { name:'Silver Chafer with Sterno',   category:'Food Warmers & Chafing Dishes',desc:'Silver chafer dish with fuel',                  image:'/Events-decor/Silver-Chafer-with-1-sterno.webp' },
  { name:'Food Pans',                   category:'Food Warmers & Chafing Dishes',desc:'Stainless steel food pans',                     image:'/Events-decor/food-pans.webp' },
  { name:'Stainless Trays',            category:'Trays & Display Stands',    desc:'Heavy duty stainless serving trays',               image:'/Events-decor/Stainless-Trays.webp' },
  { name:'Waiter Stands',              category:'Trays & Display Stands',    desc:'Folding waiter tray stands',                       image:'/Events-decor/waiter-stands.webp' },
  { name:'White Cupcake Stand',         category:'Trays & Display Stands',    desc:'Tiered white cupcake display stand',               image:'/Events-decor/White-Cupcake-Stand.webp' },
  { name:'Gold Backdrop',              category:'Backdrops & Arches',        desc:'Stunning gold sequin backdrop',                    image:'/Events-decor/backdrop-gold.png' },
  { name:'Wedding Backdrop',           category:'Backdrops & Arches',        desc:'Elegant white wedding backdrop',                   image:'/Events-decor/backdrop-wedding.jpg' },
  { name:'Baby Shower Backdrop',        category:'Backdrops & Arches',        desc:'Sweet baby shower themed backdrop',                image:'/Events-decor/baby-shower-backdrop.jpg' },
  { name:'Green Floral Arch',           category:'Backdrops & Arches',        desc:'Lush green floral arch',                           image:'/Events-decor/green-floral-arch.jpg' },
  { name:'Peach Floral Arch',           category:'Backdrops & Arches',        desc:'Romantic peach floral arch',                       image:'/Events-decor/peach-floral-arch.jpg' },
  { name:'White Floral Wedding Arch',   category:'Backdrops & Arches',        desc:'Classic white floral wedding arch',                image:'/Events-decor/white-floral-wedding-arch.jpg' },
  { name:'Golden Centrepiece',          category:'Centrepieces & Table Decor',desc:'Tall golden event centrepiece',                    image:'/Events-decor/golden-centerpiece.jpg' },
  { name:'Candelabra Centrepiece',      category:'Centrepieces & Table Decor',desc:'Classic candelabra centrepiece',                   image:'/Events-decor/candelabra-centerpeice.jpg' },
  { name:'LED Table Light',            category:'Centrepieces & Table Decor',desc:'Cordless LED colour table light',                  image:'/Events-decor/cordless-led-red-table.jpg' },
  { name:'Starlight Twinkle Floor',    category:'Centrepieces & Table Decor',desc:'Magical starlight dance floor',                    image:'/Events-decor/starlight-twinkle-floor.jpg' },
  { name:'Double Layer Stage Setup',    category:'Stage & Tent Structures',   desc:'Full double-layer event stage',                    image:'/Events-decor/double-layer-stage-setup.jpg' },
  { name:'Marquee Canopy',             category:'Stage & Tent Structures',   desc:'Large marquee event canopy',                       image:'/Events-decor/marquee-canopy.jpg' },
  { name:'Pop-Up Canopy',              category:'Stage & Tent Structures',   desc:'Quick setup pop-up canopy',                        image:'/Events-decor/pop-up-canopy.jpg' },
  { name:'Mist Fan',                   category:'Cooling & Beverage',        desc:'Outdoor cooling mist fan',                         image:'/Events-decor/mist-fan.jpg' },
  { name:'Champagne Wall',             category:'Cooling & Beverage',        desc:'Elegant champagne wall display',                   image:'/Events-decor/Champagne-wall.jpg' },
  { name:'Beverage Infuser',           category:'Cooling & Beverage',        desc:'Glass beverage infuser dispenser',                 image:'/Events-decor/RC5719-Beverage-infuser.webp' },
  { name:'Elara Divider Gold & Black', category:'Room Dividers',             desc:'Gold & black Elara room divider',                  image:'/Events-decor/Elara-Divider-Gold-Black-Event-Setting-300x225.jpg.webp' },
  { name:'Market Umbrella (Natural)',   category:'Umbrellas',                 desc:'11ft natural market umbrella',                     image:'/Events-decor/UMBL-MARKET-11-NATURAL-.webp' },
  { name:'Tea Pot',                    category:'Tea & Coffee Service',      desc:'Elegant serving tea pot',                          image:'/Events-decor/tea-pot.webp' },
];

const seed = async () => {
  await connectDB();

  const cateringCount = await CateringItem.countDocuments();
  const rentalCount   = await RentalItem.countDocuments();

  if (cateringCount === 0) {
    console.log('Seeding catering items...');
    for (const item of CATERING) {
      await new CateringItem(item).save();
    }
    console.log(`✅ ${CATERING.length} catering items seeded`);
  } else {
    console.log(`ℹ️  Catering already has ${cateringCount} items — skipping`);
  }

  if (rentalCount === 0) {
    console.log('Seeding rental items...');
    for (const item of RENTALS) {
      await new RentalItem(item).save();
    }
    console.log(`✅ ${RENTALS.length} rental items seeded`);
  } else {
    console.log(`ℹ️  Rentals already has ${rentalCount} items — skipping`);
  }

  process.exit(0);
};

seed();
