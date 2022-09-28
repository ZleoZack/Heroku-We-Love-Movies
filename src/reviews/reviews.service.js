const knex = require("../db/connection");
const reduceProperties = require("../utils/reduce-properties");
const mapProperties = require("../utils/map-properties");


const reduceCritics = reduceProperties("review_id", {
    preferred_name: ["critic", null, "preferred_name"],
    surname: ["critic", null, "surname"],
    organization_name: ["critic", null, "organization_name"],
});

const conjoinCritic = mapProperties({
    preferred_name: "critic.preferred_name",
    surname: "critic.surname",
    organization_name: "critic.organization_name"
})

function newCritic(review_id) {
return knex("reviews as r")
.join("critics as c", "r.critic_id", "c.critic_id")
.select("r.*", "c.*")
.where({ review_id })
.first()
.then(conjoinCritic)
}

function read(review_id) {
    return knex("reviews")
    .select("*")
    .where({ review_id })
    .first();
}

function update(updatedReview) {
return knex("reviews")
.select("*")
.where({ review_id: updatedReview.review_id})
.update(updatedReview, "*")
}

function destroy(review_id) {
return knex("reviews")
.where({ review_id })
.del();
}

module.exports = {
    read,
    update,
    newCritic,
    conjoinCritic,
    reduceCritics,
    delete: destroy,
};