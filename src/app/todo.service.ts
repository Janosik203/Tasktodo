import { Injectable } from '@angular/core';
import { TagList } from './tag-list';
import { zadList } from './output-interface';


@Injectable({
  providedIn: 'root'
})
export class TodoService {

  tagList: TagList[] = [];
  zadList: zadList[] = [];
  id: number = 0;
  idZad: number = 0;
  liczbazad: number = 0;
  constructor() { }

  init() {
    
    const SprawdzenieIstnieniaTagStorage = localStorage.getItem("tagStorage");
    if (SprawdzenieIstnieniaTagStorage) {
      this.tagList = JSON.parse(SprawdzenieIstnieniaTagStorage);
      this.id = 1 + this.tagList.reduce((accumulator, currentValue) => currentValue.id > accumulator ? currentValue.id : accumulator, 0);
    }
    const SprawdzenieIstnieniaZadStorage = localStorage.getItem("zadStorage");
    if (SprawdzenieIstnieniaZadStorage) {
      this.zadList = JSON.parse(SprawdzenieIstnieniaZadStorage);
      this.idZad = 1 + this.zadList.reduce((accumulator, currentValue) => currentValue.idZad && currentValue.idZad > accumulator ? currentValue.idZad : accumulator, 0);
    }
  }
  modZad(arg: zadList) {
    const modZadname = this.zadList.findIndex(x => x.idZad == arg.idZad);
    this.zadList[modZadname].zadName = arg.zadName
    this.zadList[modZadname].description = arg.description

    localStorage.setItem('zadStorage', JSON.stringify(this.zadList));
  }
  modTagName(arg: TagList) {
    const idTag = this.tagList.findIndex(x => x.id == arg.id);
    const tagname = this.tagList[idTag].name

    const filterZadArry = this.zadList.filter(x => x.tagName == tagname)
    this.tagList[idTag].name = arg.name
    for (var index in filterZadArry) {
      this.zadList[index].tagName = arg.name;

    }
    localStorage.setItem('zadStorage', JSON.stringify(this.zadList));
    localStorage.setItem('tagStorage', JSON.stringify(this.tagList));

  }
  addTag(tag: string) {
    this.tagList.push({ id: this.id, name: tag })
    this.id++;
    localStorage.setItem('tagStorage', JSON.stringify(this.tagList));
  }

  deleteTag(tag: string) {
    this.tagList.findIndex(x => x.name == tag);
    this.tagList.splice(this.tagList.findIndex(x => x.name == tag), 1)
    localStorage.setItem('tagStorage', JSON.stringify(this.tagList));
  }

  addNewZad(arg: zadList) {
    this.zadList.push({ idZad: this.idZad, tagName: arg.tagName, zadName: arg.zadName, description: arg.description, done: false, aktywacja: false })
    const a = this.tagList.findIndex(x => x.name == arg.tagName)
    // this.tagList[a].liczbazad = (this.tagList[a].liczbazad ?? 0) + 1
    this.liczbzadania(arg)
    this.idZad++;
    localStorage.setItem('zadStorage', JSON.stringify(this.zadList));
  }

  doneZad(arg: zadList) {
    const index = this.zadList.findIndex(x => x.zadName == arg.zadName);
    this.zadList[index].done = true;
    this.liczbzadania(arg)
    // this.tagList[this.tagList.findIndex(x => x.name == arg.tagName)].liczbazad = - 1;
    localStorage.setItem('zadStorage', JSON.stringify(this.zadList));
  }

  addDescription(arg: zadList) {
    const index = this.zadList.findIndex(x => x.idZad == arg.idZad);
    this.zadList[index].description = arg.description;
    localStorage.setItem('zadStorage', JSON.stringify(this.zadList));

  }
  liczbzadania(zad : zadList){
    this.liczbazad = this.zadList.filter(x=>x.tagName === zad.tagName).filter(x=>x.done === false).length
  }
}
