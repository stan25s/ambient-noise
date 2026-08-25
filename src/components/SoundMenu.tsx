import SoundCard from "./SoundCard";
import { type categoryArray, allCategories, allSounds } from "../data/sounds";
import './SoundMenu.css';
import { useState } from "react";

function SoundMenu({ masterVolume }: { masterVolume: number }) {

    // const [activeCategories, setActiveCategories] = useState(allCategories);
    // maintain a list of categories, using allCategories as default.
    const [categoryArray, setCategoryArray] = useState(allCategories);

    const [sounds] = useState(allSounds);

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

    // when the categoryArray changes, process the changes to category for the sound cards:
    // useEffect(() => {

    // //sort the sound array to place cards in the active category first.
    // // setSounds(sounds.sort((a, b) => areTheseCategoriesActive(b.categories) - areTheseCategoriesActive(a.categories)));

    // console.log(categoryArray);
    // console.log(sounds);
    // }, [categoryArray])

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
                    (sound => <SoundCard key={sound.id} sound={sound} masterVolume={masterVolume} isInActiveCategory={areTheseCategoriesActive(sound.categories)===1} />)}

                {/* {(sounds.filter((s) => areTheseCategoriesActive(s.categories)).map
                    (sound => {
                        const isInActiveCategory: boolean = true;
                        return (<SoundCard sound={sound} masterVolume={masterVolume} isInActiveCategory={isInActiveCategory} />)
                    }))}
                {(sounds.filter((s) => !areTheseCategoriesActive(s.categories)).map
                    (sound => {
                        const isInActiveCategory: boolean = false;
                        return (<SoundCard sound={sound} masterVolume={masterVolume} isInActiveCategory={isInActiveCategory} />)
                    }))} */}
            </div>
        </div>
    )
}

export default SoundMenu