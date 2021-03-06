class Object {
	constructor() {
		this.pos = new Vector(0, 0, 0)
		this.color = [255, 255, 255]
		this.reflection = 0.1
		this.diffusion = 0.2
		this.shape = 'ball'
		this.size = new Vector(100, 100, 100)
	}
	load() {
		world.addObject(this)
	}
	remove() {
		let idx = world.objects.indexOf(this)
		if(idx != -1) world.objects.splice(idx, 1)
	}
}