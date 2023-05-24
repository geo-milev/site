export enum AchievementCategory {
    Olympiads = "olympiads",
    Sports = "sports",
    Arts = "arts",
}

export const getAchievementQuery = (
    achievementCategory: AchievementCategory
) => {
    return `query {
    	allNews(limit: 10, sort: "-publishDate",where: { AND: [{successCategory: { equals: ${achievementCategory.toString()}}}, {isSuccess: { equals: true}}]}) {
    	    docs {
    	        title
    	        description
    	        postImage {
    	            url
    	            alt
    	        }
    	        publishDate
    	        id
    	    }
    	}
    }`;
};
