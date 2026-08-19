import SoundCard from "./SoundCard";
import { type categoryArray, type soundArray, allCategories } from "../data/sounds";
import './SoundMenu.css';
import { useEffect, useState } from "react";

function SoundMenu({ sounds, masterVolume }: { sounds: soundArray, masterVolume: number }) {

    // const [activeCategories, setActiveCategories] = useState(allCategories);
    // maintain a list of categories, using allCategories as default.
    const [categoryArray, setCategoryArray] = useState(allCategories);

    function areTheseCategoriesActive(categoryIds: number[]): boolean {
        // loop through the supplied categories. if any are active, return true.
        for (let index = 0; index < categoryIds.length; index++) {
            const element = categoryIds[index];
            const filteredCategories = categoryArray.filter((c) => c.id == element);

            if (filteredCategories.length === 1) {
                if (categoryArray.filter((c) => c.id == element)[0].active) {
                    return true;
                }
            }
        }
        // no active categories found
        return false;
    }

    function onClickCategory(categoryId: number) {
        let tempCategoryArray: categoryArray = JSON.parse(JSON.stringify(categoryArray));

        // toggle the relevant category's active state in the category array:
        tempCategoryArray.filter((category) => category.id == categoryId)[0].active =
            !tempCategoryArray.filter((category) => category.id == categoryId)[0].active;

        // then update the actual stateful category array: 
        setCategoryArray(tempCategoryArray);
        console.log(categoryArray);
    }

    useEffect(() => {
        console.log(categoryArray);
    }, [categoryArray])

    return (
        <div className="sound-menu-container">
            <div className="tag-container">
                {/* display all the active categories first: */}
                {categoryArray.filter((category) => category.active == true).map(category =>
                    <div className="tag active" id={category.name} onClick={() => onClickCategory(category.id)}>
                        {category.name}
                    </div>)}

                {(categoryArray.filter((category) => category.active == true).length > 0) ? 
                (<div className="spacer"/>) : (null)}

                {/* then all the inactive categories: */}
                {categoryArray.filter((category) => category.active != true).map(category =>
                    <div className="tag inactive" id={category.name} onClick={() => onClickCategory(category.id)}>
                        {category.name}
                    </div>)}
            </div>
            <div className="card-container">
                {/* if all categories are active, or all categories are inactive, display full set of cards normally. */}
                {/* otherwise dispplay active-category cards first, followed by inactive-category cards (with a decreased opacity) */}
                
                    {
                    (sounds.filter((s) => areTheseCategoriesActive(s.categories)).map
                        (sound => {
                            const isInActiveCategory: boolean = true;
                            return (<SoundCard sound={sound} masterVolume={masterVolume} isInActiveCategory={isInActiveCategory}/>)
                        }))}
                    {(sounds.filter((s) => !areTheseCategoriesActive(s.categories)).map
                        (sound => {
                            const isInActiveCategory: boolean = false;
                            return (<SoundCard sound={sound} masterVolume={masterVolume} isInActiveCategory={isInActiveCategory}/>)
                        }))}
            </div>
        </div>
    )
}

export default SoundMenu