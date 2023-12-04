const baseUrl = "https://dattebayo-api.onrender.com";
const collectionName = "characters";
const page = 1;
const limit = 1430;
const nameFilter = "filtro_pelo_nome";

const url = `${baseUrl}/${collectionName}?page=${page}&limit=${limit}`;

const contListPerson = document.querySelector("#contList");

var dataPerson = [];

async function getUser() {
    const axi = await axios.get(url);

    axi.data.characters.map(async (e) => {
        if (e.images.length != 0) {
            if (true) {
                cardGenerate(e);
            }
        }
    });
}

getUser();

async function cardGenerate(params) {
    const d1 = document.createElement("li");
    $(d1).addClass("line");

    $("#contList").append(d1);

    const d2 = document.createElement("section");
    $(d2).addClass("card");

    $(d1).append(d2);

    const d3 = document.createElement("img");
    $(d3).attr("src", params.images[0]).addClass("imgPerson");

    $(d2).append(d3);

    const d4 = document.createElement("div");
    $(d4).addClass("areaName");

    $(d2).append(d4);

    const d5 = document.createElement("p");
    d5.innerText = params.name;
    $(d5).addClass("name");

    $(d4).append(d5);

    const btn = document.createElement("button");
    $(btn).prop("id", params.id);
    btn.innerText = "( ! )";
    $(btn).addClass("btnOpen");
    $(btn).prop("title", "Mais informações...");
    $(btn).on("click", () => {
        modalShow(params.id);
    });

    $(d2).append(btn);

    $("#btnClose").on("click", function () {
        $("#exampleModal").modal("hide");
    });
}
async function modalShow(element) {
    const baseUrl2 = "https://dattebayo-api.onrender.com/characters/" + element;
    var popu = await axios.get(baseUrl2);

    $("#exampleModal").modal("show");

    $("#modalName").text(popu.data.name);

    popu.data.personal.clan != undefined
        ? $("#modalClan").text("Clan: " + popu.data.personal.clan)
        : $("#modalClan").text("");

    popu.data.family.father
        ? $("#modalFather").text("Pai: " + popu.data.family.father)
        : $("#modalFather").text("");

    popu.data.family.mother
        ? $("#modalMother").text("Mãe: " + popu.data.family.mother)
        : $("#modalMother").text("");

    popu.data.jutsu
        ? $("#modalJutsu").text("Justsu(s): " + popu.data.jutsu[0])
        : $("#modalJutsu").text("");

    popu.data.debut.manga
        ? $("#modalManga").text(
              "Primera aparição em mangá: " + popu.data.debut.manga
          )
        : $("#modalManga").text("");

    popu.data.debut.anime
        ? $("#modalAnime").text(
              "Primera aparição em anime: " + popu.data.debut.anime
          )
        : $("#modalAnime").text("");
}
