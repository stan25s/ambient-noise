import MenuSoundCard from "./MenuSoundCard";
import { type categoryArray, type SoundProps, allCategories, allSounds, maximumActiveCards } from "../data/sounds";
import './SoundMenu.css';
import { useState } from "react";

function SoundMenu({ masterVolume, activeCards, setActiveCards }: { masterVolume: number, activeCards: SoundProps[], setActiveCards: Function }) {

    // maintain a list of categories, using allCategories as default.
    const [categoryArray, setCategoryArray] = useState(allCategories);

    const [sounds] = useState(allSounds);

    function addToActiveCards(soundCardId: string) {
        const tempActiveCards: SoundProps[] = activeCards ?? [];

        // return early if activeCards is at its' maximum length, or this card ID is already active.
        if (tempActiveCards.length >= maximumActiveCards) {
            return;
        } else if (tempActiveCards.find((sound) => sound.id === soundCardId)) {
            return;
        }
        const found = sounds.find((sound) => sound.id === soundCardId);

        // append the selected card to the end of the list of active cards,
        // but only if the card was actually found.
        if (!found) {
            console.warn(`addToActiveCards: sound id not found: ${soundCardId}`);
            return;
        }

        console.log(`adding ${found.id}`);
        setActiveCards(tempActiveCards.concat(found));
    }

    // use 0 and 1 for false and true to indicate whether any categories are active for 
    function areTheseCategoriesActive(categoryIds: number[]): number {
        // loop through the supplied categories. if any are active, return true.
        for (let index = 0; index < categoryIds.length; index++) {
            const element = categoryIds[index];
            const filteredCategories = categoryArray.filter((c) => c.id == element);

            if (filteredCategories.length === 1) {
                if (categoryArray.filter((c) => c.id == element)[0].active) {
                    return 1;
                }
            }
        }
        // no active categories found
        return 0;
    }

    function onClickCategory(categoryId: number) {
        let tempCategoryArray: categoryArray = JSON.parse(JSON.stringify(categoryArray));

        // toggle the relevant category's active state in the category array:
        tempCategoryArray.filter((category) => category.id == categoryId)[0].active =
            !tempCategoryArray.filter((category) => category.id == categoryId)[0].active;

        // then update the actual stateful category array: 
        setCategoryArray(tempCategoryArray);
    }

    const sortedCards = [...sounds].sort((a, b) =>
        areTheseCategoriesActive(b.categories) - areTheseCategoriesActive(a.categories)
    );

    return (
        <div className="sound-menu-container">
            <div className="tag-container">
                {/* display all the active categories first: */}
                {categoryArray.filter((category) => category.active == true).map(category =>
                    <div key={category.name} className="tag active" id={category.name} onClick={() => onClickCategory(category.id)}>
                        {category.name}
                    </div>)}

                {(categoryArray.filter((category) => category.active == true).length > 0) ?
                    (<div className="spacer" />) : (null)}

                {/* then all the inactive categories: */}
                {categoryArray.filter((category) => category.active != true).map(category =>
                    <div key={category.name} className="tag inactive" id={category.name} onClick={() => onClickCategory(category.id)}>
                        {category.name}
                    </div>)}
            </div>
            <div className="card-container">
                {/* if all categories are active, or all categories are inactive, display full set of cards normally. */}
                {/* otherwise dispplay active-category cards first, followed by inactive-category cards (with a decreased opacity) */}

                {sortedCards.map
                    (sound => <MenuSoundCard key={sound.id} sound={sound} masterVolume={masterVolume} isInActiveCategory={areTheseCategoriesActive(sound.categories) === 1} onClick={addToActiveCards} />)}

            </div>
        </div>
    )
}

export default SoundMenu